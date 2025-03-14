import { ReactNode, useEffect, useState } from "react";
import { ApiLoadedContext } from "../../context/api-load-context";
import { LoginProviderType, useLoginData } from "../../hooks/use-login-data";
import { Profile, useProfile } from "../../hooks/use-profile";

const setApiAuthToken: Record<
  LoginProviderType,
  (authToken: string) => Promise<void>
> = {
  google: async (authToken: string) => {
    gapi.client.setToken({ access_token: authToken });
  },
};

const getProfile: Record<LoginProviderType, () => Promise<Profile>> = {
  google: async () => {
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
  },
};

const loadApi: Record<LoginProviderType, () => Promise<void>> = {
  google: async () => {
    await new Promise((resolve) => gapi.load("client", resolve));
    await gapi.client.load(
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    );
  },
};

// The class responsible for loading the APIs
export function ApiLoadedProvider({ children }: { children: ReactNode }) {
  const [loginData] = useLoginData();
  const [loadedApis, setLoadedApis] = useState<LoginProviderType[]>([]);
  const [_, setProfile] = useProfile();

  // Login handler
  useEffect(() => {
    console.log("Handling a login");
    const handleLogin = async () => {
      if (loginData?.loginProvider) {
        if (!loadedApis.includes(loginData.loginProvider)) {
          await loadApi[loginData.loginProvider]();
          await setApiAuthToken[loginData?.loginProvider](loginData?.authToken);
          setLoadedApis([...loadedApis, loginData.loginProvider]);
        }
        const profile = await getProfile[loginData.loginProvider]();
        setProfile(profile);
      } else {
        setProfile({});
      }
    };
    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData?.loginProvider]);

  // Auth token change handler
  useEffect(() => {
    if (loginData?.authToken && loadedApis.includes(loginData?.loginProvider)) {
      setApiAuthToken[loginData?.loginProvider](loginData?.authToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData?.authToken]);

  return (
    <ApiLoadedContext.Provider
      value={
        loginData?.loginProvider !== undefined &&
        loadedApis.includes(loginData?.loginProvider)
      }
    >
      {children}
    </ApiLoadedContext.Provider>
  );
}
