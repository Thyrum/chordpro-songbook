import { TextField } from "@mui/material";
import { useSong } from "../../hooks/song/use-song";
import { useEventListener } from "usehooks-ts";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SongInput({ songId }: { songId: number }) {
  const [song, setSongContent, updateSongMetadata] = useSong(songId);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  useEventListener("beforeunload", updateSongMetadata);

  // Store separate local content to avoid cursor jumps in input fields
  const [content, setContentLocal] = useState(song?.content ?? "");

  function isInFocus() {
    return document.hasFocus() && inputRef.current === document.activeElement;
  }

  // Only update local content state when song content from DB changes
  // This prevents cursor jumps while typing
  useEffect(() => {
    if (
      song !== undefined &&
      ((content !== song?.content && !isInFocus()) || !initialized.current)
    ) {
      setContentLocal(song?.content ?? "");
      initialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song?.content]);

  const setContent = useCallback(
    (newContent: string) => {
      setContentLocal(newContent);
      setSongContent(newContent);
    },
    [setSongContent],
  );

  if (!song) {
    return null;
  }

  return (
    <TextField
      variant="outlined"
      onChange={(e) => setContent(e.target.value)}
      value={content}
      multiline
      sx={{ height: "100%" }}
      slotProps={{
        input: {
          sx: {
            height: "100%",
            alignItems: "start",
          },
        },
      }}
      inputRef={inputRef}
      onBlur={updateSongMetadata}
      fullWidth
    />
  );
}
