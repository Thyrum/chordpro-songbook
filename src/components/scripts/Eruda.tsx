import eruda from "eruda";
import { useEffect } from "react";

export default function Eruda() {
  useEffect(() => {
    eruda.init();
  }, []);
  return null;
}
