import { db } from "../../database/database";

export async function deleteSong(id: number) {
  await db.songContent.delete(id);
  await db.songMetadata.delete(id);
}
