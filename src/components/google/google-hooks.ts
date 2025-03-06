import { useLocalStorage } from "usehooks-ts";
import { TokenResponse } from "@react-oauth/google";
import { useEffect } from "react";
import { people } from "@googleapis/people";

export type Credentials =
  | undefined
  | Omit<TokenResponse, "error" | "error_description" | "error_uri">;

export const useGoogleCredentials = () =>
  useLocalStorage<Credentials>("google-auth-credentials", undefined);

export const useGoogleProfile = () => {
  const [credentials] = useGoogleCredentials();
  //
  const [profile, setProfile] = useLocalStorage<"">("profile", "");

  useEffect(() => {
    if (credentials && credentials.access_token) {
      console.log(credentials.access_token);

      // try {
      //   people("v1")
      //     .people.get({
      //       personFields: "names",
      //       oauth_token: credentials.access_token,
      //       resourceName: "people/me",
      //     })
      //     .then((value) => {
      //       console.log(value);
      //     })
      //     .catch((error) => console.error(error));
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }, [credentials, setProfile]);

  return profile;
};
