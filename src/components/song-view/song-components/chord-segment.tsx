import { Box } from "@mui/material";
import { TChordSegment } from "../../../types/song";
import Chord from "./chord";

export default function ChordSegment({ segment }: { segment: TChordSegment }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexShrink: 0,
        flexDirection: "column",
      }}
    >
      <Chord chord={segment.chord} />
      <Box>{segment.text?.replaceAll(" ", "\u00A0") ?? ""}</Box>
    </Box>
  );
}
