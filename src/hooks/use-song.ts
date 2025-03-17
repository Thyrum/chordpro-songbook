import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../database/database";
import { useCallback } from "react";

export function useSong(
  id: number,
): [string, (newContent: string) => void, () => void, () => void] {
  const song = useLiveQuery(() => db.songs.get(id), [id]);

  const setSongContent = useCallback(
    (content: string) => {
      db.songs.update(id, { content });
    },
    [id],
  );

  const syncSongContent = () => {};

  const deleteSong = useCallback(() => {
    db.songs.delete(id);
  }, [id]);

  return [song?.content ?? "", setSongContent, syncSongContent, deleteSong];
}
