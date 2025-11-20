import { Lyrics, Section, SectionType } from "../../../models/sections";
import { TabsSection } from "../../../models/sections/TabsSection";
import { LyricsSectionView } from "./LyricsSection";
import { TabsSectionView } from "./TabsSection";

export function SectionView({ section }: { section: Section }) {
  switch (section.sectionType) {
    case SectionType.Lyrics:
      return <LyricsSectionView section={section as Lyrics} />;
    case SectionType.Tabs:
      return <TabsSectionView section={section as TabsSection} />;
    case SectionType.None:
      return null;
  }
}
