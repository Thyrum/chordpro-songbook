import { createContext } from "react";

export type FileApiType = {
  getFile: (name: string) => Promise<string | null>;
  // If file doesn't exist, creates it
  saveFile: (name: string, content: string, mimeType?: string) => Promise<void>;
  deleteFile: (name: string) => Promise<void>;
};

export const emptyFileApi = {
  getFile: async () => null,
  saveFile: async () => {},
  deleteFile: async () => {},
};

export const FileApiContext = createContext<FileApiType>(emptyFileApi);
