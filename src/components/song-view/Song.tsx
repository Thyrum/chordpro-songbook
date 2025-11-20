import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Song } from "../../models";
import { SectionView } from "./sections";
import { ZoomFitContainer } from "../layout/zoom-fit-container";

export function SongView({ song }: { song: Song }) {
  const theme = useTheme();
  return (
    <>
      <Paper elevation={1} sx={{ padding: theme.spacing(1) }}>
        <Typography variant="h3">{song.title}</Typography>
        <Typography variant="subtitle1">{song.subtitle}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {song.artists.length > 0 ? "By " + song.artists.join(", ") : ""}
        </Typography>
      </Paper>
      <ZoomFitContainer>
        <Box sx={{ padding: theme.spacing(1) }}>
          {song.sections.map((section, index) => (
            <SectionView key={index} section={section} />
          ))}
        </Box>
      </ZoomFitContainer>
    </>
  );
}
