import { RawLine } from "@/models/lines";
import { ABCSection } from "@/models/sections/ABCSection";
import { AbcView } from "@components/abc-view";
import { Box } from "@mui/material";
import { SectionHeader } from "../SectionHeader";

export function ABCSectionView({ section }: { section: ABCSection }) {
  const abcCode = section.lines
    .map((line) => (line as RawLine).value)
    .join("\n");

  const scale = section.attributes["scale"]
    ? Number(section.attributes["scale"])
    : undefined;

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
        }}
      />
    </Box>
  );
}
