import { useState, useEffect, ReactNode, useCallback, memo } from "react";
import { GOOGLE_AUTH_CLIENT_ID } from "../../env-config";
import {
  GoogleAuthContext,
  GoogleProfileContextType,
  GoogleProfileContext,
  GoogleDriveContextType,
} from "../../context/gapi-context";
import { useLocalStorage } from "usehooks-ts";

async function getProfile(): Promise<GoogleProfileContextType> {
  const user = await gapi.client.drive.about.get({
    fields: "user/photoLink,user/displayName",
  });
  if (user.result) {
    return {
      name: user.result.user?.displayName,
      photo: user.result.user?.photoLink,
    };
  } else {
    return {};
  }
}

const driveFunctions: GoogleDriveContextType = {
  getFile: async (fileId: string) => {
    const file = await gapi.client.drive.files.get({
      fileId,
      alt: "media",
    });
    if (file.result) {
      return file.result;
    }
  },
};

export function GapiProvider({ children }: { children: ReactNode }) {
  const [driveApiLoaded, setDriveApiLoaded] = useState(false);
  const [profile, setProfile] = useLocalStorage<GoogleProfileContextType>(
    "google-profile",
    {},
  );

  const [client, setClient] = useState<
    google.accounts.oauth2.TokenClient | undefined
  >(undefined);

  const [accessToken, setAccessToken] = useLocalStorage<string | undefined>(
    "google-auth-token",
    undefined,
  );

  useEffect(() => {
    if (driveApiLoaded) {
      getProfile().then((profile) => setProfile(profile));
    } else {
      setProfile({});
    }
  }, [driveApiLoaded, setProfile]);

  async function loadDrive(response: google.accounts.oauth2.TokenResponse) {
    if (
      !google.accounts.oauth2.hasGrantedAllScopes(
        response,
        "https://www.googleapis.com/auth/drive.appdata",
      )
    ) {
      return;
    }

    await gapi.client.load(
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    );
    setDriveApiLoaded(true);
  }

  useEffect(() => {
    gapi.load("client", () => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_AUTH_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.appdata",
        callback: async (response) => {
          if (response && response.access_token) {
            setAccessToken(response.access_token);
            gapi.client.setToken({ access_token: response.access_token });

            loadDrive(response);
          }
        },
      });
      setClient(client);
    });
  }, []);

  return (
    <GoogleAuthContext.Provider
      value={{
        authenticate: useCallback(() => client?.requestAccessToken(), [client]),
        refresh: useCallback(() => {
          if (accessToken !== undefined) client?.requestAccessToken();
        }, [client, accessToken]),
        logout: useCallback(() => {
          if (accessToken !== undefined) {
            setAccessToken(undefined);
            setProfile({});
          }
        }, [accessToken, setAccessToken, setProfile]),
      }}
    >
      <GoogleProfileContext.Provider value={profile}>
        {children}
      </GoogleProfileContext.Provider>
    </GoogleAuthContext.Provider>
  );
}
