import { TextField } from "@mui/material";
import { useSong } from "../../hooks/song/use-song";
import { useEventListener } from "usehooks-ts";
import { useCallback, useEffect, useState } from "react";

export default function SongInput({ songId }: { songId: number }) {
  const [song, setSongContent, updateSongMetadata] = useSong(songId);

  useEventListener("beforeunload", updateSongMetadata);

  // Store separate local content to avoid cursor jumps in input fields
  const [content, setContentLocal] = useState(song?.content ?? "");

  // Only update local content state when song content from DB changes
  // This prevnets cursor jumps while typing
  useEffect(() => {
    if (content !== song?.content) {
      setContentLocal(song?.content ?? "");
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
      autoFocus
      onBlur={updateSongMetadata}
      fullWidth
    />
  );
}
