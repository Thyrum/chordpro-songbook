import { useLocalStorage } from "usehooks-ts";
import { TokenResponse } from "@react-oauth/google";
import { useEffect } from "react";

export type Credentials =
  | undefined
  | Omit<TokenResponse, "error" | "error_description" | "error_uri">;

export const useGoogleCredentials = () =>
  useLocalStorage<Credentials>("google-auth-credentials", undefined);

export const useGoogleProfile = () => {
  const [credentials] = useGoogleCredentials();

  const [profile, setProfile] = useLocalStorage("profile", {});

  useEffect(() => {
    const user = fetch(
      "https://people.googleapis.com/v1/people/me?personField=names,emailAddresses",
    );
    setProfile(user);
    console.log(user);
  }, [credentials, setProfile]);
};
