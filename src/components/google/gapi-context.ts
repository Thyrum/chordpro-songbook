import { createContext } from "react";

export type Profile = {
  name?: string;
  photo?: string;
};

export const ProfileContext = createContext<Profile>({});

export const AuthContext = createContext<{
  authenticate: undefined | (() => void);
  refresh: () => void;
  logout: () => void;
}>({
  authenticate: undefined,
  refresh: () => {},
  logout: () => {},
});
