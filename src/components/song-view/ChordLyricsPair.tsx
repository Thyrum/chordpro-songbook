import { Box, useTheme } from "@mui/material";
import { ChordLyricsPair } from "../../models";
import { ChordView } from "./Chord";

export function ChordLyricsPairView({
  chordLyricsPair,
  showEmptyChord = true,
}: {
  chordLyricsPair: ChordLyricsPair;
  showEmptyChord?: boolean;
}) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {chordLyricsPair.hasText() ? (
        <Box sx={{ color: theme.palette.secondary.main }}>
          {chordLyricsPair.text}
        </Box>
      ) : chordLyricsPair.chord ? (
        <ChordView chord={chordLyricsPair.chord} />
      ) : showEmptyChord ? (
        <Box>&nbsp;</Box>
      ) : null}
      <Box sx={{ whiteSpace: "pre" }}>{chordLyricsPair.lyrics}</Box>
    </Box>
  );
}
