import { RawLine } from "@/models/lines";
import { ABCSection } from "@/models/sections/ABCSection";
import { AbcView } from "@components/abc-view";
import { Box, useTheme } from "@mui/material";
import { SectionHeader } from "../SectionHeader";

export function ABCSectionView({ section }: { section: ABCSection }) {
  const abcCode = section.lines
    .map((line) => (line as RawLine).value)
    .join("\n");

  const scale = section.attributes["scale"]
    ? Number(section.attributes["scale"])
    : undefined;

  const theme = useTheme();
  console.log(theme.typography.h1);

  return (
    <Box>
      {section.label && <SectionHeader>{section.label}</SectionHeader>}
      <AbcView
        abcCode={abcCode}
        visualParams={{
          scale,
          staffwidth: 450,
          paddingleft: 0,
          paddingright: 0,
          paddingtop: 0,
          format: {
            gchordfont: theme.typography.fontFamily + " bold",
            vocalfont: theme.typography.fontFamily,
          },
        }}
      />
    </Box>
  );
}
