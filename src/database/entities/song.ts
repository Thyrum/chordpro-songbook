import { Entity } from "dexie";
import SongbookDB from "../songbook-db";

export default class Song extends Entity<SongbookDB> {
  id!: number;
  title!: string;
  content!: string;
  lastModified!: number;
}
