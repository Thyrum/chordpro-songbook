import { useContext, useEffect, useState } from "react";
import { FileListInfo, FilesMethod, FilesProviderProps } from "./files.model";
import { AuthContext } from "../auth/auth-context";
import { IFiles } from "./i-files";
import { FilesContext } from "./files-context";

export function FilesProvider({ children }: FilesProviderProps) {
  const { authMethodType, isAuthenticated } = useContext(AuthContext);
  const [filesMethod, setFilesMethod] = useState<IFiles>();

  useEffect(() => {
    if (authMethodType !== "undefined" && isAuthenticated) {
      setFilesMethod(FilesMethod[authMethodType]);
    } else {
      setFilesMethod(undefined);
    }
  }, [authMethodType, setFilesMethod, isAuthenticated]);

  async function getFile(
    name: string,
    folder?: string,
  ): Promise<string | null> {
    return (await filesMethod?.get(name, folder)) ?? null;
  }

  async function setFile(
    name: string,
    folder: string | undefined,
    content: string,
  ) {
    await filesMethod?.set(name, folder, content);
  }

  async function listFiles(
    folder: string | undefined,
  ): Promise<FileListInfo[]> {
    return (await filesMethod?.list(folder)) ?? [];
  }

  async function deleteFile(name?: string, folder?: string): Promise<void> {
    await filesMethod?.delete(name, folder);
  }

  return (
    <FilesContext.Provider
      value={{
        getFile,
        setFile,
        listFiles,
        deleteFile,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
}
