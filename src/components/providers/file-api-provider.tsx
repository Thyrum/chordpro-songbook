import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import {
  emptyFileApi,
  FileApiContext,
  FileApiType,
} from "../../context/file-api-context";
import { GenerateIdError } from "../../errors/file-errors";
import { MultiPartBuilder } from "../../util/multi-part-builder";
import { AuthMethodKey } from "../../context/auth/auth.model";
import { useAuth } from "../../hooks/use-auth";

const fetchFileId: Record<
  AuthMethodKey,
  (name: string) => Promise<string | null>
> = {
  GOOGLE: async (name: string) => {
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
  const { authMethodType, isAuthenticated } = useAuth();
  const fileIdCache = useRef<Record<string, string>>({});
  useEffect(() => {
    fileIdCache.current = {};
  }, [authMethodType]);

  // Function should only be called when user is logged in
  const getFileId: (name: string) => Promise<string | null> = useCallback(
    async (name: string) => {
      if (!(name in fileIdCache.current)) {
        const fileId = await fetchFileId[authMethodType!](name);
        if (fileId === null) {
          return null;
        }
        fileIdCache.current[name] = fileId;
      }
      return fileIdCache.current[name];
    },
    [fileIdCache, authMethodType],
  );

  const generateFileId = useCallback(
    async (name: string) => {
      let id: string | undefined = undefined;
      switch (authMethodType) {
        case "GOOGLE": {
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
    [authMethodType],
  );

  const fileApiMap: Record<AuthMethodKey, FileApiType> = useMemo(
    () => ({
      GOOGLE: {
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
          authMethodType && isAuthenticated
            ? fileApiMap[authMethodType]
            : emptyFileApi,
        [authMethodType, fileApiMap, isAuthenticated],
      )}
    >
      {children}
    </FileApiContext.Provider>
  );
}
