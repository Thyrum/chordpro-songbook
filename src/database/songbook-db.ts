import Dexie, { Table } from "dexie";
import SongContent from "./entities/song-content";
import SongMetadata from "./entities/song-metadata";

type TableWithGeneratedKey<Type, Key extends string, KeyType> = Table<
  Type,
  KeyType,
  Omit<Type, Key> & { Key?: KeyType }
>;

export default class SongbookDB extends Dexie {
  songContent!: TableWithGeneratedKey<SongContent, "id", number>;
  songMetadata!: Table<SongMetadata, number>;

  constructor() {
    super("SongbookDB");
    this.version(1).stores({
      songContent: "++id, content, lastModified",
      songMetadata: "id, title, artists",
    });
    this.songContent.mapToClass(SongContent);
    this.songMetadata.mapToClass(SongMetadata);
  }
}
