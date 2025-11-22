import React from "react";
import abcjs from "abcjs";
import { Box, useTheme } from "@mui/material";

import "abcjs/abcjs-audio.css";
import "@assets/abcjs.css";
import { AbcController } from "./abc-controller";
import { useAbcSong } from "@/hooks/abc-song/use-abc-song";

export function AbcView({
  abcCode,
  visualParams,
}: {
  abcCode: string;
  visualParams?: abcjs.AbcVisualParams;
}) {
  const theme = useTheme();

  const [updateContentRef, playbackStatus, play, pause, reset, seek] =
    useAbcSong(abcCode, visualParams);

  return (
    <Box sx={{ width: "fit-content" }}>
      <div
        style={
          {
            "--abcjs-highlight-color": theme.palette.primary.main,
            "--abcjs-selection-color": theme.palette.secondary.main,
          } as React.CSSProperties
        }
        ref={updateContentRef}
      />
      <AbcController
        play={play}
        pause={pause}
        reset={reset}
        seek={seek}
        {...playbackStatus}
      />
    </Box>
  );
}
