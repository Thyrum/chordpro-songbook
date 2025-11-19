import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useSong } from "../../hooks/song/use-song";
import { SongMetadataView } from "./song-metadata-view";
import { SongContentView } from "./song-content-view";
import { useEffect, useRef, useState } from "react";

export default function SongView(props: { songId: number }) {
  const [song] = useSong(props.songId);
  const theme = useTheme();
  const timeout = useRef<number>(0);

  const [debouncedContent, setDebouncedContent] = useState(song?.content);

  useEffect(() => {
    clearTimeout(timeout.current);
    if (!song) return;
    if (debouncedContent === song.content) return;
    if (debouncedContent === undefined) {
      setDebouncedContent(song.content);
      return;
    }
    timeout.current = setTimeout(() => {
      setDebouncedContent(song.content);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

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
