import { useCallback, useContext, useMemo } from "react";
import { GOOGLE_AUTH_CLIENT_ID } from "../env-config";
import { LoginContext } from "../context/login-context";

export function useGoogleAuthClient() {
  const [_, setLoginData, clearLoginData] = useContext(LoginContext);
  const client = useMemo(
    () =>
      google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_AUTH_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.appdata",
        callback: async (response) => {
          if (response && response.access_token) {
            await new Promise((resolve) => gapi.load("client", resolve));
            gapi.client.setToken({ access_token: response.access_token });
            await gapi.client.load(
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            );
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
