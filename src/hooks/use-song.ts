import { Dispatch, SetStateAction, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useSong(
  id: string,
): [string, Dispatch<SetStateAction<string>>, () => void] {
  const [song, setSong] = useLocalStorage(`song-${id}`, "");

  const saveSong = useCallback(() => {}, []);

  return [song, setSong, saveSong];
}
