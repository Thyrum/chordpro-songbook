import { createContext } from "react";

export type Profile = {
  name?: string;
  photo?: string;
};

export const GapiContext = createContext<{
  authenticate: undefined | (() => void);
  profile: Profile;
  refresh: () => void;
  logout: () => void;
}>({
  authenticate: undefined,
  profile: {},
  refresh: () => {},
  logout: () => {},
});
