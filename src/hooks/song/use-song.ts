import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/database";
import { useCallback } from "react";
import SongContent from "../../database/entities/song-content";
import SongMetadata from "../../database/entities/song-metadata";
import { deleteSong } from "./util";
import { ChordProParser } from "../../parsers";

type Song = SongContent & SongMetadata;

export function useSong(
  id: number,
): [
  Song | undefined,
  (newContent: string) => void,
  () => Promise<void>,
  () => Promise<void>,
  () => Promise<void>,
] {
  const song = useLiveQuery(async () => {
    const content = await db.songContent.get(id);
    const metadata = await db.songMetadata.get(id);
    if (content && metadata) {
      return { ...content, ...metadata };
    }
    return undefined;
  }, [id]);

  const setSongContent = useCallback(
    async (content: string) => {
      await db.songContent.update(id, { content });
    },
    [id],
  );

  const syncSong = async () => {};

  const updateSongMetadata = useCallback(async () => {
    const songContent = await db.songContent.get(id);
    const parser = new ChordProParser();
    const song = parser.parse(songContent?.content ?? "");
    db.songMetadata.update(id, {
      title: song.title ?? undefined,
      artists: song.artists,
    });
  }, [id]);

  const deleteSongCallback = useCallback(() => deleteSong(id), [id]);

  return [
    song,
    setSongContent,
    updateSongMetadata,
    syncSong,
    deleteSongCallback,
  ];
}
