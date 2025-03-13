import { createContext } from "react";

export type GoogleProfileContextType = {
  name?: string;
  photo?: string;
};

export const GoogleProfileContext = createContext<GoogleProfileContextType>({});

export type GoogleAuthContextType = {
  authenticate: undefined | (() => void);
  refresh: () => void;
  logout: () => void;
};

export const GoogleAuthContext = createContext<GoogleAuthContextType>({
  authenticate: undefined,
  refresh: () => {},
  logout: () => {},
});

export type GoogleDriveContextType = {
  getFile: (
    fileId: string,
  ) => Promise<gapi.client.drive.File | null | undefined>;
  setFile: (path: string, content: string) => Promise<void>;
  deleteFile: (path: string) => void;
};

export const GoogleDriveContext = createContext<GoogleDriveContextType>({
  getFile: async () => undefined,
  setFile: () => new Promise(() => {}),
  deleteFile: () => new Promise(() => {}),
});
