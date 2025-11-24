import { Box } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";

export function ZoomFitContainer({
  children,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const innerBox = useRef<HTMLDivElement>(null);
  const outerBox = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const outerWidth = outerBox.current?.clientWidth ?? 0;
    const innerWidth = innerBox.current?.scrollWidth ?? 0;
    if (innerWidth > outerWidth) {
      innerBox.current!.style.transform = `scale(${outerWidth / innerWidth})`;
      outerBox.current!.style.height = `${innerBox.current!.clientHeight * (outerWidth / innerWidth)}px`;
    } else {
      innerBox.current!.style.transform = `scale(1)`;
    }
  }, [innerBox, outerBox]);

  useEffect(() => {
    const observer = new ResizeObserver(handleResize);
    observer.observe(outerBox.current!);
    observer.observe(innerBox.current!);
    return () => {
      observer.disconnect();
    };
  }, [innerBox, outerBox, handleResize]);
  return (
    <Box ref={outerBox}>
      <Box
        ref={innerBox}
        sx={{
          minWidth: "fit-content",
          transformOrigin: "top left",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
