import { useSyncedStorage } from "./use-synced-storage";

export function useSong(
  id: string,
): [string, (newContent: string) => void, () => void, () => void] {
  const [song, setSong, syncSong, deleteSong] = useSyncedStorage(
    `song-${id}`,
    "",
    {
      serializer: (val) => val,
      deserializer: (val) => val,
    },
  );

  return [song, setSong, syncSong, deleteSong];
}
