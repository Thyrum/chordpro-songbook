import { Lyrics, Section, SectionType, Tabs } from "@models/sections";
import { LyricsSectionView } from "./LyricsSection";
import { TabsSectionView } from "./TabsSection";

export function SectionView({ section }: { section: Section }) {
  switch (section.sectionType) {
    case SectionType.Lyrics:
      return <LyricsSectionView section={section as Lyrics} />;
    case SectionType.Tabs:
      return <TabsSectionView section={section as Tabs} />;
    case SectionType.None:
      return null;
  }
}
