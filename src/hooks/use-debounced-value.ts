import { useEffect, useRef, useState } from "react";

export default function useDebouncedValue<T>(
  value: T,
  debounceMs: number,
  immediate: boolean | ((oldValue: T) => boolean) = false,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeout = useRef<number>(-1);

  useEffect(() => {
    if (
      typeof immediate === "boolean" ? immediate : immediate(debouncedValue)
    ) {
      setDebouncedValue(value);
      return;
    }
    timeout.current = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);
    return () => {
      clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debouncedValue;
}
