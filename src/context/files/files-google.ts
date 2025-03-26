import { MultiPartBuilder } from "../../util/multi-part-builder";
import { AuthMethodKey } from "../auth/auth.model";
import { FileListInfo } from "./files.model";
import { IFiles } from "./i-files";

export class FilesGoogle implements IFiles {
  public type: AuthMethodKey = "GOOGLE";
  private pathToIdCache: Record<string, string> = {};
  constructor() {}

  private toPath(name?: string, folder?: string) {
    return (folder ?? "") + "/" + (name ?? "");
  }

  private escapeName(name: string) {
    return name.replace("\\", "\\\\").replace("'", "\\'");
  }

  private async fetchId(name?: string, folder?: string) {
    if (name === undefined && folder === undefined) {
      return "appDataFolder";
    }
    const folderId = this.getId(undefined, folder);
    const query =
      name === undefined
        ? `name='${this.escapeName(folder!)}' and mimeType = 'application/vnd.google-apps.folder'`
        : `name='${this.escapeName(name)}' and '${folderId}' in parents`;
    const idQueryResult = await gapi.client.drive.files.list({
      spaces: "appDataFolder",
      q: query,
      fields: "files(id)",
    });
    return idQueryResult.result?.files?.[0].id ?? null;
  }

  private async getId(name?: string, folder?: string) {
    const path = this.toPath(name, folder);
    if (!(path in this.pathToIdCache)) {
      const fileId = await this.fetchId(name, folder);
      if (fileId === null) {
        return null;
      }
      this.pathToIdCache[path] = fileId;
    }
    return this.pathToIdCache[path];
  }

  private async generateFileId() {
    const idQueryResult = await gapi.client.drive.files.generateIds({
      count: 1,
      space: "appDataFolder",
    });
    const id = idQueryResult.result?.ids?.[0];
    if (id === undefined) {
      throw new Error("Unable to generate google file id");
    }
    return id;
  }

  private async createFolder(folder: string) {
    const id = await this.generateFileId();
    await gapi.client.drive.files.create(
      { uploadType: "media" },
      {
        id,
        mimeType: "application/vnd.google-apps.folder",
        parents: ["appDataFolder"],
        name: folder,
      },
    );
    this.pathToIdCache[this.toPath(undefined, folder)] = id;
    return id;
  }

  async get(name: string, folder?: string): Promise<string | null> {
    const fileId = await this.getId(name, folder);
    if (fileId === null) {
      return null;
    }
    const file = await gapi.client.drive.files.get({
      fileId,
      alt: "media",
    });
    return file.body;
  }

  async set(
    name: string,
    folder: string | undefined,
    content: string,
  ): Promise<void> {
    let path = "/upload/drive/v3/files";
    let method = "POST";
    const mimeType = "text/plain";

    let metadata: Record<string, string | string[]> = {};
    let fileId = await this.getId(name, folder);
    if (fileId !== null) {
      path = path + "/" + encodeURIComponent(`${fileId}`);
      method = "PATCH";
      metadata = {
        mimeType,
      };
    } else {
      let parentId = await this.getId(undefined, folder);
      if (parentId === null) {
        parentId = await this.createFolder(folder!);
      }
      fileId = await this.generateFileId();
      metadata = {
        mimeType,
        id: fileId,
        name,
        parents: [parentId],
      };
    }
    const fields = Object.keys(metadata).join(",");

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
    this.pathToIdCache[this.toPath(name, folder)] = fileId;
  }

  async list(folder: string | undefined): Promise<FileListInfo[]> {
    const folderId = await this.getId(undefined, folder);
    const query = `'${folderId}' in parents`;
    const queryResult = await gapi.client.drive.files.list({
      spaces: "appDataFolder",
      q: query,
      fields: "files(id,name,mimeType)",
    });
    const files = queryResult.result.files ?? [];
    const result: { type: "file" | "folder"; name: string }[] = [];
    for (const file of files) {
      this.pathToIdCache[this.toPath(file.name, folder)] = file.id!;
      result.push({
        name: file.name!,
        type:
          file.mimeType === "application/vnd.google-apps.folder"
            ? "folder"
            : "file",
      });
    }
    return result;
  }

  async delete(name?: string, folder?: string): Promise<void> {
    const id = await this.getId(name, folder);
    // No such file/folder exists
    if (id === null) {
      return;
    }

    // Google drive delete automatically cascades when deleting folders
    await gapi.client.drive.files.delete({
      fileId: id,
    });
    if (name === undefined) {
      const keys = Object.keys(this.pathToIdCache).filter((path) =>
        path.startsWith((folder ?? "") + "/"),
      );
      for (const key of keys) {
        delete this.pathToIdCache[key];
      }
    } else {
      delete this.pathToIdCache[this.toPath(name, folder)];
    }
  }
}
