import { useLocalStorage } from "usehooks-ts";

export type Profile = {
  name?: string;
  photo?: string;
};

export function useProfile(): ReturnType<typeof useLocalStorage<Profile>> {
  return useLocalStorage<Profile>("profile", {});
}
