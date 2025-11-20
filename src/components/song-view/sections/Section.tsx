import { Lyrics, Section, SectionType } from "../../../models/sections";
import { LyricsSectionView } from "./LyricsSection";

export function SectionView({ section }: { section: Section }) {
  switch (section.sectionType) {
    case SectionType.Lyrics:
      return <LyricsSectionView section={section as Lyrics} />;
    case SectionType.Tabs:
    case SectionType.None:
      return null;
  }
}
