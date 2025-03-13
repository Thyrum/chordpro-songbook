import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

export type LoginProviderType = "google";
export type LoginDataType = {
  loginProvider: LoginProviderType;
  authToken: string;
};

export const LoginContext = createContext<
  ReturnType<typeof useLocalStorage<LoginDataType | undefined>>
>([undefined, () => {}, () => {}]);
