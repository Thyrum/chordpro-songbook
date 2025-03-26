// See https://github.com/mcosta21/multiple-authentication-react/tree/c39bac105f850bd69726bfb5cd5d3d267f2e77b0/src/context/Auth
import { ReactNode } from "react";
import { AuthGoogle } from "./auth-google";

export interface User {
  username: string;
  email: string;
  photo?: string;
}

export interface AuthContextData {
  user?: User;
  signIn: (method: AuthMethodKey, hint?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  authMethodType: AuthMethodKey | "undefined";
}

export const AuthMethod = {
  GOOGLE: new AuthGoogle(),
};

export type AuthMethodKey = "GOOGLE";

export interface AuthProviderProps {
  children: ReactNode;
}
