import { AuthMethodKey, User } from "./auth.model";

export interface IAuth {
  type: AuthMethodKey;
  signIn: () => Promise<User | void>;
  signOut: () => Promise<void>;
  isAuthenticated: () => Promise<boolean>;
  getUser: () => Promise<User | undefined>;
}
