import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useSong } from "../../hooks/song/use-song";
import { SongMetadataView } from "./song-metadata-view";
import { SongContentView } from "./song-content-view";
import useDebouncedValue from "../../hooks/use-debounced-value";

export default function SongView(props: { songId: number }) {
  const [song] = useSong(props.songId);
  const theme = useTheme();

  const debouncedContent = useDebouncedValue(
    song?.content,
    500,
    (oldValue) => oldValue === undefined,
  );

  if (!song) return null;

  return (
    <Paper
      sx={{
        height: "100%",
        width: "fit-content",
        minWidth: "100%",
        padding: theme.spacing(2),
      }}
    >
      <Paper sx={{ padding: theme.spacing(1) }} elevation={2}>
        <SongMetadataView metadata={song} />
      </Paper>
      <SongContentView content={debouncedContent ?? ""} />
    </Paper>
  );
}
