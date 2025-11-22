import { useCallback, useEffect, useRef, useState } from "react";
import abcjs from "abcjs";
import CursorControl from "./CursorControl";

const beatSubdivisions = 32;

interface PlaybackStatus {
  beatNumber: number;
  totalBeats: number;
  totalTime: number;
  isPlaying: boolean;
  tempo: number;
}

function tempo(tune: abcjs.TuneObject) {
  const millisecondsPerMeasure = tune.millisecondsPerMeasure();
  const beatsPerMeasure = tune.getBeatsPerMeasure();
  return Math.round(
    ((beatsPerMeasure ?? 0) / (millisecondsPerMeasure ?? 1000)) * 60000,
  );
}

export function useAbcSong(code: string, visualParams?: abcjs.AbcVisualParams) {
  const tune = useRef<abcjs.TuneObject>(null);
  const cursorControl = useRef<CursorControl>(new CursorControl());
  const synth = useRef(new abcjs.synth.CreateSynth());
  const rootElement = useRef<HTMLElement>(null);
  const loadedSynth = useRef<boolean>(false);

  const reset = useCallback(async () => {
    synth.current.stop();
    timingCallbacks.current?.pause();
    timingCallbacks.current?.setProgress(0);
    setPlaybackStatus((status) => ({
      ...status,
      beatNumber: 0,
      isPlaying: false,
    }));
    cursorControl.current.onFinished();
  }, []);

  const initSynth = useCallback(async () => {
    if (!loadedSynth.current) {
      await synth.current.init({
        visualObj: tune.current!,
        options: { onEnded: reset },
      });
      await synth.current.prime();
      loadedSynth.current = true;
    }
  }, [reset]);

  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>({
    beatNumber: 0,
    totalBeats: 0,
    totalTime: 0,
    isPlaying: false,
    tempo: 120,
  });

  const timingCallbacks = useRef<abcjs.TimingCallbacks>(null);

  const pause = useCallback(async () => {
    synth.current.pause();
    timingCallbacks.current?.pause();
    setPlaybackStatus((status) => ({
      ...status,
      isPlaying: false,
    }));
  }, []);

  const renderAbc = useCallback(
    (abcCode: string, visualParams?: abcjs.AbcVisualParams) => {
      if (!abcCode.trim()) {
        if (rootElement.current) {
          rootElement.current.innerHTML = "";
        }
      }

      const clickListener: abcjs.ClickListener = async (
        abcElem: abcjs.AbcElem,
      ) => {
        await initSynth();
        if (abcElem.midiPitches) {
          abcjs.synth.playEvent(
            abcElem.midiPitches,
            abcElem.midiGraceNotePitches,
            tune.current?.millisecondsPerMeasure() ?? 400,
          );
        }
      };

      const renderReturn = abcjs.renderAbc(rootElement.current!, abcCode, {
        selectionColor: "var(--abcjs-selection-color, blue)",
        ...visualParams,
        clickListener,
      });
      tune.current = renderReturn[0];
      cursorControl.current.init();
      loadedSynth.current = false;
      if (!timingCallbacks.current) {
        timingCallbacks.current = new abcjs.TimingCallbacks(tune.current, {
          eventCallback: (event) => {
            if (event) cursorControl.current?.onEvent(event);
            else cursorControl.current?.onFinished();
            return undefined;
          },
          beatCallback: (beatNumber, totalBeats, totalTime) => {
            setPlaybackStatus((status) => ({
              beatNumber: beatNumber * beatSubdivisions,
              totalBeats: totalBeats * beatSubdivisions,
              totalTime,
              isPlaying: status.isPlaying,
              tempo: status.tempo,
            }));
          },
          beatSubdivisions,
        });
      } else {
        timingCallbacks.current.replaceTarget(tune.current!);
        timingCallbacks.current.setProgress(0);
      }
      setPlaybackStatus({
        tempo: tempo(tune.current!),
        totalBeats: tune.current!.getTotalBeats() * beatSubdivisions,
        beatNumber: 0,
        totalTime: tune.current!.getTotalTime(),
        isPlaying: false,
      });
    },
    [reset],
  );

  const updateRootRef = useCallback(
    (node: HTMLElement | null) => {
      reset();
      if (node !== null) {
        cursorControl.current.setRootElement(node);
        rootElement.current = node;
        renderAbc(code);
      }
    },
    [renderAbc, code, reset],
  );

  const play = useCallback(async () => {
    if (!tune.current) return;

    await initSynth();

    setPlaybackStatus((status) => ({
      ...status,
      isPlaying: true,
    }));
    synth.current.start();
    timingCallbacks.current?.start();
  }, []);

  const seek = useCallback(async (beatNumber: number) => {
    await initSynth();
    synth.current.seek(beatNumber / beatSubdivisions, "beats");
    timingCallbacks.current?.setProgress(
      beatNumber / beatSubdivisions,
      "beats",
    );
  }, []);

  useEffect(() => {
    renderAbc(code, visualParams);
    return () => {
      reset();
    };
  }, [renderAbc, code, reset, visualParams]);

  return [updateRootRef, playbackStatus, play, pause, reset, seek] as const;
}
