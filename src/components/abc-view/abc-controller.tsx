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
  return (
    <Paper sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box display="flex" alignItems="center">
        <IconButton>
          <SkipPrevious onClick={reset} />
        </IconButton>
        {isPlaying ? (
          <IconButton onClick={pause}>
            <Pause />
          </IconButton>
        ) : (
          <IconButton onClick={play}>
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
      <Typography flexShrink={0}>{totalTime}</Typography>
      <Typography flexShrink={0}>{`${tempo} bpm`}</Typography>
    </Paper>
  );
}
