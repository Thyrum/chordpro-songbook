import { DEV } from "../../env-config";

export function Eruda() {
  if (DEV) {
    import("eruda").then((eruda) => eruda.default.init());
  }
  return null;
}
