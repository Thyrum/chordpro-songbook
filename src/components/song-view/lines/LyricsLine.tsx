import { Box } from "@mui/material";
import { LyricsLine } from "@models/lines";
import { ChordLyricsPairView } from "../ChordLyricsPair";

export function LyricsLineView({ line }: { line: LyricsLine }) {
  return (
    <Box sx={{ display: "flex" }}>
      {line.pairs.map((pair, index) => (
        <ChordLyricsPairView
          key={index}
          chordLyricsPair={pair}
          showEmptyChord={line.pairs.length > 1}
        />
      ))}
    </Box>
  );
}
