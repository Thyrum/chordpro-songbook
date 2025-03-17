import { TextField } from "@mui/material";
import { useDBSong } from "../../hooks/use-db-song";
import { useCallback, useEffect, useState } from "react";

function SongInput({ songId }: { songId: number }) {
  const [DBsong, setDBSong] = useDBSong(songId);
  const [content, setContent] = useState(DBsong);

  const onBlur = useCallback(async () => {
    setDBSong(content);
  }, [setDBSong, content]);

  useEffect(() => {
    setContent(DBsong);
  }, [DBsong]);

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
      onBlur={onBlur}
      fullWidth
    />
  );
}

export default SongInput;
