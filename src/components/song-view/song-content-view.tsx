import { Box, Paper } from "@mui/material";
import Verse from "./song-components/verse";
import { ChordProParser } from "../../parsers";

export function SongContentView({ content }: { content: string }) {
  const songParser = new ChordProParser();
  const parsedSong = songParser.parse(content);

  return (
    <>
      <Verse
        verse={{
          lines: [
            {
              type: SongLineType.CHORD_LINE,
              content: [
                { text: "A" },
                { text: "mazing ", chord: "G" },
                { text: "Grace, how ", chord: "G7" },
                { text: "sweet the ", chord: "C" },
                { text: "sound", chord: "G" },
              ],
            },
            {
              type: SongLineType.LYRICS_LINE,
              content: "That saved a wretch like me!",
            },
          ],
        }}
      />
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Box sx={{ whiteSpace: "pre" }}>{content}</Box>
      </Paper>
    </>
  );
}
