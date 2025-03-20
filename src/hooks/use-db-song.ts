import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database/database";
import { useCallback } from "react";

export function useDBSong(
  id: number,
): [
  string,
  (newContent: string) => Promise<void>,
  () => Promise<void>,
  () => Promise<void>,
] {
  const song = useLiveQuery(() => db.songs.get(id), [id]);

  const setSongContent = useCallback(
    async (content: string) => {
      await db.songs.update(id, { content });
    },
    [id],
  );

  const syncSongContent = async () => {};

  const deleteSong = useCallback(async () => {
    await db.songs.delete(id);
  }, [id]);

  return [song?.content ?? "", setSongContent, syncSongContent, deleteSong];
}
