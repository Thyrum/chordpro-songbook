import { Box } from "@mui/material";
import { TChord } from "../../../types/song";

export default function Chord({ chord }: { chord?: TChord }) {
  return <Box sx={{ whiteSpace: "pre" }}>{chord ?? "" + "\u00A0"}</Box>;
}
