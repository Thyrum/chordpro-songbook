import { Box, useTheme } from "@mui/material";
import { ChordLyricsPair } from "../../models";
import { ChordView } from "./Chord";

export function ChordLyricsPairView({
  chordLyricsPair,
}: {
  chordLyricsPair: ChordLyricsPair;
}) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {chordLyricsPair.hasText() ? (
        <Box sx={{ color: theme.palette.secondary.main }}>
          {chordLyricsPair.text}
        </Box>
      ) : (
        <ChordView chord={chordLyricsPair.chord} />
      )}
      <Box>{chordLyricsPair.lyrics}</Box>
    </Box>
  );
}
