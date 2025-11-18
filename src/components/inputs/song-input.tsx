import { TextField } from "@mui/material";
import { useSong } from "../../hooks/song/use-song";
import { useEffect } from "react";

export default function SongInput({ songId }: { songId: number }) {
  const [song, setSongContent, updateSongMetadata] = useSong(songId);

  useEffect(() => {
    window.addEventListener("beforeunload", updateSongMetadata);
    return () => {
      window.removeEventListener("beforeunload", updateSongMetadata);
    };
  }, [updateSongMetadata]);

  if (!song) {
    return null;
  }

  return (
    <TextField
      variant="outlined"
      onChange={(e) => setSongContent(e.target.value)}
      value={song.content}
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
