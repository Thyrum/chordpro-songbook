import { TextField } from "@mui/material";
import { useSong } from "../../hooks/use-song";
import { useEffect } from "react";

function SongInput({ songId }: { songId: string }) {
  const [song, setSong, syncSong] = useSong(songId);
  useEffect(() => {
    syncSong();
  }, []);

  return (
    <TextField
      variant="outlined"
      onChange={(e) => setSong(e.target.value)}
      value={song}
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
      onBlur={syncSong}
      fullWidth
    />
  );
}

export default SongInput;
