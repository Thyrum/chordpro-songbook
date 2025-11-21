import { Box } from "@mui/material";
import { Lyrics } from "@models/sections";
import { capitalizeFirstLetter } from "@utils/string";
import { SectionHeader } from "../SectionHeader";
import { LineView } from "../lines";

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
