import { Lyrics, Section, SectionType, Tabs } from "@models/sections";
import { LyricsSectionView } from "./LyricsSection";
import { TabsSectionView } from "./TabsSection";
import { ABCSectionView } from "./ABCSection";
import { ABCSection } from "@/models/sections/ABCSection";

export function SectionView({ section }: { section: Section }) {
  switch (section.sectionType) {
    case SectionType.Lyrics:
      return <LyricsSectionView section={section as Lyrics} />;
    case SectionType.Tabs:
      return <TabsSectionView section={section as Tabs} />;
    case SectionType.ABC:
      return <ABCSectionView section={section as ABCSection} />;
    case SectionType.None:
      return null;
    default:
      console.warn(`Unsupported section type: ${section.sectionType}`);
  }
}
