import { Pause, PlayArrow, SkipPrevious } from "@mui/icons-material";
import { Box, IconButton, Paper, Slider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-thumb": {
    transition: "none",
  },
  "& .MuiSlider-track": {
    transition: "none",
  },
}));

export function AbcController({
  play,
  pause,
  reset,
  seek,
  beatNumber,
  totalBeats,
  totalTime,
  tempo,
  isPlaying,
}: {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  reset: () => Promise<void>;
  seek: (beat: number) => Promise<void>;
  beatNumber: number;
  totalBeats: number;
  totalTime: number;
  tempo: number;
  isPlaying: boolean;
}) {
  const currentTime = Math.floor(
    ((beatNumber / totalBeats) * totalTime) / 1000,
  );
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  return (
    <Paper sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box display="flex" alignItems="center">
        <IconButton size="small">
          <SkipPrevious onClick={reset} />
        </IconButton>
        {isPlaying ? (
          <IconButton size="small" onClick={pause}>
            <Pause />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={play}>
            <PlayArrow />
          </IconButton>
        )}
      </Box>
      <CustomSlider
        size="small"
        value={beatNumber}
        max={totalBeats}
        onChange={(_event, value) => seek(value as number)}
        onChangeCommitted={(_event, value) => seek(value as number)}
      />
      <Typography flexShrink={0}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </Typography>
      <Typography
        variant="caption"
        flexShrink={0}
      >{`(${tempo} bpm)`}</Typography>
    </Paper>
  );
}
