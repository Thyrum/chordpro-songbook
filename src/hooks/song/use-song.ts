import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/database";
import { useCallback, useEffect, useState } from "react";
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
  () => void,
  () => void,
  () => void,
] {
  const song = useLiveQuery(
    async () => {
      const content = await db.songContent.get(id);
      const metadata = await db.songMetadata.get(id);
      if (content && metadata) {
        return { ...content, ...metadata };
      }
      return undefined;
    },
    [id],
    { id, title: "Loading...", artists: [], content: "", lastModified: 0 },
  );

  // Store separate local content to avoid cursor jumps in input fields
  const [content, setContent] = useState(song?.content ?? "");

  // Only update local content state when song content from DB changes
  // This prevnets cursor jumps while typing
  useEffect(() => {
    if (content !== song?.content) {
      setContent(song?.content ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song?.content]);

  const setSongContent = useCallback(
    (content: string) => {
      setContent(content);
      db.songContent.update(id, { content });
    },
    [id],
  );

  const syncSong = () => {};

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
    song ? { ...song, content } : undefined,
    setSongContent,
    updateSongMetadata,
    syncSong,
    deleteSongCallback,
  ];
}
