import { Box } from "@mui/material";
import { ChordLyricsPair } from "@models";
import { ChordView } from "./Chord";

export function ChordLyricsPairView({
  chordLyricsPair,
  showEmptyChord = true,
}: {
  chordLyricsPair: ChordLyricsPair;
  showEmptyChord?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {chordLyricsPair.hasText() ? (
        <Box sx={{ color: "secondary.main" }}>{chordLyricsPair.text}</Box>
      ) : chordLyricsPair.chord ? (
        <ChordView chord={chordLyricsPair.chord} />
      ) : showEmptyChord ? (
        <Box>&nbsp;</Box>
      ) : null}
      <Box sx={{ whiteSpace: "pre" }}>{chordLyricsPair.lyrics}</Box>
    </Box>
  );
}
