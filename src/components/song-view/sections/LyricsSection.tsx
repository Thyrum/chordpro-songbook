import { Box } from "@mui/material";
import { Lyrics } from "../../../models/sections";
import { LineView } from "../lines/Line";

export function LyricsSectionView({ section }: { section: Lyrics }) {
  return (
    <Box sx={{ whiteSpace: "pre" }}>
      {section.lines.map((line, index) => (
        <LineView key={index} line={line} />
      ))}
    </Box>
  );
}
