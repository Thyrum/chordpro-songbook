import { useEffect, useRef } from "react";
import { Stack, TextField } from "@mui/material";
import { useSessionStorage } from "usehooks-ts";
import type abcjs from "abcjs";
import "abcjs/abcjs-audio.css";

const defaultContent = `X:1
T:Amazing Grace
M:3/4
L:1/4
Q:1/4=100
K:G
D | G2 (3B/A/G/ | B2A | G2E | D2
D | G2 (3B/A/G/ | B2A/B/ | d3- | d2
B/d/ | d2 (3B/A/G/ | B2A | G2E | D2
D | G2 (3B/A/G/ | B2A | G3-| G2 |]`;

export function ABCEditor() {
  const [text, setText] = useSessionStorage("abcjs-tool", defaultContent, {
    serializer: (v: string) => v,
    deserializer: (v: string) => v,
  });
  const editor = useRef<abcjs.Editor>(undefined);
  const canvas = useRef<HTMLDivElement>(null);
  const warnings = useRef<HTMLDivElement>(null);
  const synth = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // import("abcjs-audio.css");
    import("abcjs").then((abcjs) => {
      editor.current = new abcjs.Editor("abcjs-textarea", {
        canvas_id: canvas.current!,
        warnings_id: warnings.current!,
        synth: {
          el: synth.current!,
          options: {
            // @ts-expect-error the types aren't defined properly
            displayWarp: true,
          },
        },
      });
    });
  }, []);

  return (
    <Stack direction="row">
      <TextField
        variant="outlined"
        onChange={(e) => setText(e.target.value)}
        value={text}
        id="abcjs-textarea"
        multiline
        sx={{ height: "100%", flexGrow: 1 }}
        slotProps={{
          input: {
            sx: {
              height: "100%",
              alignItems: "start",
            },
          },
        }}
      />
      <Stack direction="column">
        <div ref={canvas} />
        <div ref={warnings} />
        <div ref={synth} />
      </Stack>
    </Stack>
  );
}
