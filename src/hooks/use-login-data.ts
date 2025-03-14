import { useLocalStorage } from "usehooks-ts";

export type LoginProviderType = "google";
export type LoginDataType = {
  loginProvider: LoginProviderType;
  authToken: string;
};

export const useLoginData = () =>
  useLocalStorage<LoginDataType | undefined>("login-data", undefined);
