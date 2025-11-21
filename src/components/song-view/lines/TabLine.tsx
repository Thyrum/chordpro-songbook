import { Box } from "@mui/material";
import { TabLine } from "@models/lines";

export function TabLineView({ line }: { line: TabLine }) {
  return (
    <Box sx={{ fontFamily: "monospace", whiteSpace: "pre" }}>{line.value}</Box>
  );
}
