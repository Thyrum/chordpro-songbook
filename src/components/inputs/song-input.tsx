import { TextField } from "@mui/material";
import { useSong } from "../../hooks/use-song";

function SongInput({ songId }: { songId: string }) {
  const [song, setSong, saveSong] = useSong(songId);

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
      onBlur={saveSong}
      fullWidth
    />
  );
}

export default SongInput;
