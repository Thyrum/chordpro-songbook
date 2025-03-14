import { useCallback, useMemo } from "react";
import { GOOGLE_AUTH_CLIENT_ID } from "../env-config";
import { useLoginData } from "./use-login-data";

export function useGoogleAuthClient() {
  const [_, setLoginData, clearLoginData] = useLoginData();
  const client = useMemo(
    () =>
      google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_AUTH_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.appdata",
        callback: async (response) => {
          if (response && response.access_token) {
            setLoginData({
              loginProvider: "google",
              authToken: response.access_token,
            });
          }
        },
      }),
    [setLoginData],
  );

  return {
    authenticate: useCallback(() => client.requestAccessToken(), [client]),
    refresh: useCallback(() => {
      if (gapi.client.getToken().access_token) {
        client.requestAccessToken();
      }
    }, [client]),
    logout: useCallback(() => {
      gapi.client.setToken(null);
      clearLoginData();
    }, [clearLoginData]),
  };
}
