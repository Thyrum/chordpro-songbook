import { RawLine } from "@/models/lines";
import { ABCSection } from "@/models/sections/ABCSection";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import abcjs from "abcjs";

export function ABCSectionView({ section }: { section: ABCSection }) {
  const target = useRef<HTMLDivElement>(null);

  const abcCode = section.lines
    .map((line) => (line as RawLine).value)
    .join("\n");

  useEffect(() => {
    if (target.current) {
      abcjs.renderAbc(target.current!, abcCode, {
        scale: section.attributes["scale"]
          ? Number(section.attributes["scale"])
          : undefined,
      });
    }
  }, [abcCode, section.attributes]);
  return <Box ref={target}></Box>;
}
