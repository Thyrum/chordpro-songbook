import { useMemo, useRef } from "react";
import { useSong } from "../hooks/song/use-song";
import useDebouncedValue from "../hooks/use-debounced-value";
import { ChordProParser } from "../parsers";
import { SongView } from "./song-view/Song";

export function DebouncedSongView({
  songId,
  debounceMs = 500,
}: {
  songId: number;
  debounceMs?: number;
}) {
  const [song] = useSong(songId);
  const oldId = useRef<number>(songId);

  const debouncedContent = useDebouncedValue(
    song?.content,
    debounceMs,
    (oldValue) => {
      const newSong = oldId.current !== songId;
      oldId.current = songId;
      return newSong || oldValue === undefined;
    },
  );

  const parsedSong = useMemo(() => {
    const parser = new ChordProParser();
    return parser.parse(debouncedContent ?? "");
  }, [debouncedContent]);

  return <SongView song={parsedSong} />;
}
