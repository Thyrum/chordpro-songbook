import { Box } from "@mui/material";
import { TabsSection } from "@models/sections/TabsSection";
import { SectionHeader } from "../SectionHeader";
import { LineView } from "../lines";

export function TabsSectionView({ section }: { section: TabsSection }) {
  return (
    <Box>
      {section.value && <SectionHeader>{section.value}</SectionHeader>}
      {section.lines.map((line) => (
        <LineView line={line} />
      ))}
    </Box>
  );
}
