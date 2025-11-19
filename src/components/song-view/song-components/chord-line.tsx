import { Box } from "@mui/material";
import { TChordLine } from "../../../types/song";
import ChordSegment from "./chord-segment";

export default function ChordLine({ line }: { line: TChordLine }) {
  return (
    <Box sx={{ display: "flex" }}>
      {line.map((segment, index) => (
        <ChordSegment segment={segment} key={`${index}-${segment}`} />
      ))}
    </Box>
  );
}
