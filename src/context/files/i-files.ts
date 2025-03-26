import { AuthMethodKey } from "../auth/auth.model";
import { FileListInfo } from "./files.model";

export interface IFiles {
  type: AuthMethodKey;
  get(name: string, folder?: string): Promise<string | null>;
  set(name: string, folder: string | undefined, content: string): Promise<void>;
  list(folder: string | undefined): Promise<FileListInfo[]>;
  delete(name?: string, folder?: string): Promise<void>;
}
