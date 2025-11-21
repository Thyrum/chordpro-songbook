import { useEffect, useRef } from "react";
import abcjs from "abcjs";
import { Box } from "@mui/material";

import "abcjs/abcjs-audio.css";
import "../assets/abcjs.css";

class CursorControl implements abcjs.CursorControl {
  private cursor: SVGElement | null = null;
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  onStart() {
    this.cursor?.remove();
    this.cursor = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    this.cursor.setAttribute("class", "abcjs-cursor");
    this.cursor.setAttributeNS(null, "x1", "0");
    this.cursor.setAttributeNS(null, "y1", "0");
    this.cursor.setAttributeNS(null, "x2", "0");
    this.cursor.setAttributeNS(null, "y2", "0");
    this.root.querySelector("svg")?.appendChild(this.cursor);
  }

  private removeSelection() {
    const elements = this.root.querySelectorAll(".abcjs-highlight");
    for (const element of elements) {
      element.classList.remove("abcjs-highlight");
    }
  }

  onEvent(ev: abcjs.NoteTimingEvent) {
    // This is called every time a note or a rest is reached and contains the coordinates of it.
    if (ev.measureStart && ev.left === null) return; // this was the second part of a tie across a measure line. Just ignore it.

    this.removeSelection();

    // Select the currently selected notes.
    for (const note of ev.elements ?? []) {
      for (const part of note) {
        part.classList.add("abcjs-highlight");
      }
    }

    // Move the cursor to the location of the current note.
    if (this.cursor) {
      this.cursor.setAttribute("x1", String((ev.left ?? 0) - 2));
      this.cursor.setAttribute("x2", String((ev.left ?? 0) - 2));
      this.cursor.setAttribute("y1", String(ev.top ?? 0));
      this.cursor.setAttribute("y2", String((ev.top ?? 0) + (ev.height ?? 0)));
    }
  }

  onFinished() {
    this.removeSelection();

    if (this.cursor) {
      this.cursor.setAttribute("x1", "0");
      this.cursor.setAttribute("x2", "0");
      this.cursor.setAttribute("y1", "0");
      this.cursor.setAttribute("y2", "0");
    }
  }
}

export function AbcView({
  abcCode,
  visualParams,
}: {
  abcCode: string;
  visualParams: abcjs.AbcVisualParams;
}) {
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

  useEffect(() => {
    const renderReturn = abcjs.renderAbc(
      contentRef.current!,
      abcCode,
      visualParams,
    );
    const oldTune = tune.current;
    tune.current = renderReturn[0];

    synthController.current.setTune(tune.current, oldTune !== null);
  }, [abcCode, visualParams]);

  return (
    <>
      <Box ref={contentRef} />
      <Box ref={controllerRef} />
    </>
  );
}
