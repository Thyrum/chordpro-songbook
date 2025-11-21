import { Box, Paper, Typography } from "@mui/material";
import { Song } from "@models";
import { SectionView } from "./sections";
import { ZoomFitContainer } from "@components/layout/zoom-fit-container";

export function SongView({ song }: { song: Song }) {
  return (
    <>
      <Paper elevation={1} sx={{ padding: 1 }}>
        <Typography variant="h3">{song.title ?? <i>Untitled</i>}</Typography>
        <Typography variant="subtitle1">{song.subtitle}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {song.artists.length > 0 ? "By " + song.artists.join(", ") : ""}
        </Typography>
      </Paper>
      <ZoomFitContainer>
        <Box sx={{ padding: 1 }}>
          {song.sections.map((section, index) => (
            <SectionView key={index} section={section} />
          ))}
        </Box>
      </ZoomFitContainer>
    </>
  );
}
