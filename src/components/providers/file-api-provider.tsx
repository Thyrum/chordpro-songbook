import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  emptyFileApi,
  FileApiContext,
  FileApiType,
} from "../../context/file-api-context";
import { GenerateIdError } from "../../errors/file-errors";
import { MultiPartBuilder } from "../../util/multi-part-builder";
import { LoginProviderType, useLoginData } from "../../hooks/use-login-data";
import { ApiLoadedContext } from "../../context/api-load-context";

const fetchFileId: Record<
  LoginProviderType,
  (name: string) => Promise<string | null>
> = {
  google: async (name: string) => {
    const idQueryResult = await gapi.client.drive.files.list({
      spaces: "appDataFolder",
      q: `name='${name.replace("\\", "\\\\").replace("'", "\\'")}'`,
      fields: "files(id)",
    });
    if (
      idQueryResult.result?.files === undefined ||
      idQueryResult.result.files.length < 1 ||
      idQueryResult.result.files[0].id === undefined
    ) {
      return null;
    }
    return idQueryResult.result.files[0].id;
  },
};

export function FileApiProvider({ children }: { children: ReactNode }) {
  const [loginData] = useLoginData();
  const apiLoaded = useContext(ApiLoadedContext);
  const fileIdCache = useRef<Record<string, string>>({});
  useEffect(() => {
    fileIdCache.current = {};
  }, [loginData?.loginProvider]);

  // Function should only be called when loginData is set
  const getFileId: (name: string) => Promise<string | null> = useCallback(
    async (name: string) => {
      if (!(name in fileIdCache.current)) {
        const fileId = await fetchFileId[loginData!.loginProvider](name);
        if (fileId === null) {
          return null;
        }
        fileIdCache.current[name] = fileId;
      }
      return fileIdCache.current[name];
    },
    [fileIdCache, loginData],
  );

  const generateFileId = useCallback(
    async (name: string) => {
      let id: string | undefined = undefined;
      switch (loginData?.loginProvider) {
        case "google": {
          const idQueryResult = await gapi.client.drive.files.generateIds({
            count: 1,
            space: "appDataFolder",
          });
          id = idQueryResult.result?.ids?.[0];
          break;
        }
      }
      if (id === undefined) {
        throw new GenerateIdError();
      }
      fileIdCache.current[name] = id;
      return id;
    },
    [loginData?.loginProvider],
  );

  const fileApiMap: Record<LoginProviderType, FileApiType> = useMemo(
    () => ({
      google: {
        getFile: async (name: string) => {
          const fileId = await getFileId(name);
          if (fileId === null) {
            return null;
          }
          const file = await gapi.client.drive.files.get({
            fileId,
            alt: "media",
          });
          return file.body;
        },
        saveFile: async (
          name: string,
          content: string,
          mimeType: string = "text/plain",
        ) => {
          let path = "/upload/drive/v3/files";
          let method = "POST";

          let metadata: Record<string, string | string[]> = {};
          let fileId = await getFileId(name);
          let fields = "";
          if (fileId !== null) {
            path = path + "/" + encodeURIComponent(`${fileId}`);
            method = "PATCH";
            metadata = {
              mimeType,
            };
          } else {
            fileId = await generateFileId(name);
            metadata = {
              mimeType,
              id: fileId,
              name,
              parents: ["appDataFolder"],
            };
          }
          fields = Object.keys(metadata).join(",");

          const multiPart = new MultiPartBuilder("multiPart/related")
            .append("application/json", JSON.stringify(metadata))
            .append(mimeType, content)
            .finish();
          await gapi.client.request({
            path,
            method,
            params: { uploadType: "multipart", fields },
            headers: { "Content-Type": multiPart.type },
            body: multiPart.body,
          });
        },
        deleteFile: async (name: string) => {
          const fileId = await getFileId(name);
          if (fileId === null) {
            return;
          }
          await gapi.client.drive.files.delete({
            fileId,
          });
        },
      },
    }),
    [generateFileId, getFileId],
  );

  return (
    <FileApiContext.Provider
      value={useMemo(
        () =>
          apiLoaded && loginData?.loginProvider
            ? fileApiMap[loginData?.loginProvider]
            : emptyFileApi,
        [loginData?.loginProvider, fileApiMap, apiLoaded],
      )}
    >
      {children}
    </FileApiContext.Provider>
  );
}
