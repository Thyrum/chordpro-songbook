import Dexie, { EntityTable } from "dexie";
import Song from "./entities/song";

export default class SongbookDB extends Dexie {
  songs!: EntityTable<Song, "id">;

  constructor() {
    super("SongbookDB");
    this.version(1).stores({
      songs: "++id, title, content, lastModified",
    });
    this.songs.mapToClass(Song);
  }
}
