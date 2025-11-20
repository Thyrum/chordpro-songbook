import { useNavigate, useParams } from "react-router";
import SongInput from "../components/inputs/song-input";
import { db } from "../database/database";
import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DebouncedSongView } from "../components/debounced-song";

export function EditSongPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    db.songMetadata.get(Number(songId)).then((metadata) => {
      if (!metadata) {
        navigate("/");
      }
    });
  }, [navigate, songId]);

  if (!songId) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        gap: theme.spacing(1),
      }}
    >
      <Box
        sx={{
          flex: `1`,
          width: `calc(50% - ${theme.spacing(0.5)})`,
        }}
      >
        <SongInput songId={Number(songId)} />
      </Box>
      <Box
        sx={{
          flex: "1",
          width: `calc(50% - ${theme.spacing(0.5)})`,
        }}
      >
        <DebouncedSongView songId={Number(songId)} />
      </Box>
    </Box>
  );
}
