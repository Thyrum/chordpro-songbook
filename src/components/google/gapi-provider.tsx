import { useState, useEffect, ReactNode } from "react";
import { GOOGLE_AUTH_CLIENT_ID } from "../../env-config";
import { GapiContext, Profile } from "./gapi-context";
import { useLocalStorage } from "usehooks-ts";

export function GapiProvider({ children }: { children: ReactNode }) {
  const [googleApi, setGoogleApi] = useState<typeof gapi.client | undefined>(
    undefined,
  );
  const [profile, setProfile] = useLocalStorage<Profile>("google-profile", {});

  const [client, setClient] = useState<
    google.accounts.oauth2.TokenClient | undefined
  >(undefined);

  const [accessToken, setAccessToken] = useLocalStorage<string | undefined>(
    "google-auth-token",
    undefined,
  );

  useEffect(() => {
    gapi.load("client", () => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_AUTH_CLIENT_ID,
        scope:
          "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.appdata",
        callback: async (response) => {
          if (response && response.access_token) {
            setAccessToken(response.access_token);
            gapi.client.setToken({ access_token: response.access_token });

            if (
              google.accounts.oauth2.hasGrantedAllScopes(
                response,
                "https://www.googleapis.com/auth/userinfo.profile",
              )
            ) {
              await gapi.client.load(
                "https://people.googleapis.com/$discovery/rest?version=v1",
              );
              const user = await gapi.client.people.people.get({
                resourceName: "people/me",
                personFields: "names,photos",
              });
              console.log(user);
              if (user.result) {
                setProfile({
                  name: user.result.names?.filter(
                    (value) => value.metadata?.primary,
                  )[0].displayName,
                  photo: user.result.photos?.filter(
                    (value) => value.metadata?.primary,
                  )[0].url,
                });
              }
            }
          }
        },
      });
      setClient(client);
    });
  }, []);

  return (
    <GapiContext.Provider
      value={{
        authenticate: () => client?.requestAccessToken(),
        profile,
        refresh: () => {
          if (accessToken !== undefined) client?.requestAccessToken();
        },
        logout: () => {
          if (accessToken !== undefined) {
            setAccessToken(undefined);
            setProfile({});
          }
        },
      }}
    >
      {children}
    </GapiContext.Provider>
  );
}
