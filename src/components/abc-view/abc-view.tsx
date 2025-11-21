import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";
import { Box, useTheme } from "@mui/material";
import CursorControl from "./CursorControl";

import "abcjs/abcjs-audio.css";
import "@assets/abcjs.css";
import { AbcController } from "./abc-controller";

export function AbcView({
  abcCode,
  visualParams,
}: {
  abcCode: string;
  visualParams?: abcjs.AbcVisualParams;
}) {
  const theme = useTheme();
  const controllerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const tune = useRef<abcjs.TuneObject>(null);
  const cursorControl = useRef<CursorControl>(null);
  const synthController = useRef<abcjs.SynthObjectController>(
    new abcjs.synth.SynthController(),
  );

  const startTimer = () => {
    cursorControl.current?.onStart();
    const timingCallbacks = new abcjs.TimingCallbacks(tune.current!, {
      eventCallback: (event) => {
        if (event) cursorControl.current?.onEvent(event);
        else cursorControl.current?.onFinished();
        return undefined;
      },
    });
    timingCallbacks.start();
    console.log("Start timer");
  };

  useEffect(() => {
    cursorControl.current = new CursorControl(contentRef.current!);
    synthController.current.load(
      controllerRef.current!,
      cursorControl.current,
      {
        displayWarp: true,
        displayRestart: true,
      },
    );
    controllerRef
      .current!.querySelector(".start")
      ?.addEventListener("click", () => {
        cursorControl.current?.onStart();
      });

    controllerRef.current
      ?.querySelector(".start")
      ?.addEventListener("click", startTimer);
  }, []);

  const clickListener: abcjs.ClickListener = async (abcElem: abcjs.AbcElem) => {
    console.log("Clicked on element:", abcElem);
    console.log("Audio contet", abcjs.synth.activeAudioContext());
    await abcjs.synth.activeAudioContext().resume();
    if (abcElem.midiPitches) {
      abcjs.synth.playEvent(
        abcElem.midiPitches,
        abcElem.midiGraceNotePitches,
        tune.current?.millisecondsPerMeasure() ?? 400,
      );
    }
  };

  useEffect(() => {
    if (!abcCode.trim()) {
      contentRef.current!.innerHTML = "";
      controllerRef.current!.innerHTML = "";
      return;
    }
    const renderReturn = abcjs.renderAbc(contentRef.current!, abcCode, {
      clickListener,
      selectionColor: "var(--abcjs-selection-color, blue)",
      ...visualParams,
    });
    tune.current = renderReturn[0];

    synthController.current.setTune(tune.current, false);
  }, [abcCode, visualParams]);

  return (
    <Box sx={{ width: "fit-content" }}>
      <div
        style={
          {
            "--abcjs-highlight-color": theme.palette.primary.main,
            "--abcjs-selection-color": theme.palette.secondary.main,
          } as React.CSSProperties
        }
        ref={contentRef}
      />
      <div ref={controllerRef} />
    </Box>
  );
}
