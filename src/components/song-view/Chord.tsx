import { Box } from "@mui/material";
import { Chord } from "@models";

export function ChordView({ chord }: { chord: Chord }) {
  return <Box sx={{ fontWeight: "bold" }}>{chord.toString() + "\u00A0"}</Box>;
}
