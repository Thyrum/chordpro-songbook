import { Box } from "@mui/material";
import { Lyrics } from "../../../models/sections";
import { LineView } from "../lines/Line";
import { capitalizeFirstLetter } from "../../../util/string";
import { SectionHeader } from "../SectionHeader";

function getHeader(section: Lyrics) {
  return (
    section.value ?? (section.name ? capitalizeFirstLetter(section.name) : null)
  );
}

export function LyricsSectionView({ section }: { section: Lyrics }) {
  const header = getHeader(section);
  return (
    <Box>
      {header && <SectionHeader>{header}</SectionHeader>}
      {section.lines.map((line, index) => (
        <LineView key={index} line={line} />
      ))}
    </Box>
  );
}
