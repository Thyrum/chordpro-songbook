import { Box } from "@mui/material";
import ChordLine from "./song-components/chord-line";

export function SongContentView({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <ChordLine
      line={[
        { text: "A" },
        { text: "mazing ", chord: "G" },
        { text: "Grace, how ", chord: "G7" },
        { text: "sweet the ", chord: "C" },
        { text: "sound", chord: "G" },
      ]}
    />
  );
  return <Box sx={{ whiteSpace: "pre" }}>{content}</Box>;
}
