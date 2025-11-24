import { RawLine } from "@/models/lines";
import { ABCSection } from "@/models/sections/ABCSection";
import { AbcView } from "@components/abc-view";

export function ABCSectionView({ section }: { section: ABCSection }) {
  const abcCode = section.lines
    .map((line) => (line as RawLine).value)
    .join("\n");

  const scale = section.attributes["scale"]
    ? Number(section.attributes["scale"])
    : undefined;

  return (
    <AbcView
      abcCode={abcCode}
      visualParams={{
        scale,
        staffwidth: 450,
      }}
    />
  );
}
