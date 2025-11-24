import { useNavigate, useParams } from "react-router";
import SongInput from "@components/inputs/song-input";
import { db } from "@database/database";
import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { DebouncedSongView } from "@components/debounced-song";
import { NavigationContext } from "@/context/navigation-context";

export function EditSongPage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useContext(NavigationContext);

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
        flexDirection: isMobile ? "column-reverse" : "row",
        height: "100%",
        gap: 1,
      }}
    >
      <Box
        sx={{
          flex: `1`,
          width: (theme) =>
            isMobile ? "100%" : `calc(50% - ${theme.spacing(0.5)})`,
        }}
      >
        <SongInput songId={Number(songId)} />
      </Box>
      <Box
        sx={{
          flex: "1",
          width: (theme) =>
            isMobile ? "100%" : `calc(50% - ${theme.spacing(0.5)})`,
        }}
      >
        <DebouncedSongView songId={Number(songId)} />
      </Box>
    </Box>
  );
}
