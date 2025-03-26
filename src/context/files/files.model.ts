import { ReactNode } from "react";
import { FilesGoogle } from "./files-google";

export type FileListInfo = {
  type: "file" | "folder";
  name: string;
};

export interface FilesContextData {
  // Get the file stored at the specified location
  getFile(name: string, folder?: string): Promise<string | null>;
  // Update or create a file at the specified location
  setFile(
    name: string,
    folder: string | undefined,
    content: string,
  ): Promise<void>;
  listFiles(folder: string | undefined): Promise<FileListInfo[]>;
  // Calling deleteFile with name: undefined will delete the folder
  deleteFile(name?: string, folder?: string): Promise<void>;
}

export const FilesMethod = {
  GOOGLE: new FilesGoogle(),
};

export interface FilesProviderProps {
  children: ReactNode;
}
