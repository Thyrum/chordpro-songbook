import { AuthMethodKey, User } from "./auth.model";

export interface IAuth {
  type: AuthMethodKey;
  signIn(hint?: string): Promise<User | void>;
  // Try another signIn but without user interaction
  refresh(hint?: string): Promise<User | void>;
  signOut(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  getUser(): Promise<User | undefined>;
}
