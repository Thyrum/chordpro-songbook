import { ReactNode, useEffect, useRef } from "react";
import {
  LoginContext,
  LoginDataType,
  LoginProviderType,
} from "../../context/login-context";
import { Profile, useProfile } from "../../hooks/use-profile";
import { useLocalStorage } from "usehooks-ts";

const getProfile: Record<
  Exclude<LoginProviderType, undefined>,
  () => Promise<Profile>
> = {
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

const loadApi: Record<
  Exclude<LoginProviderType, undefined>,
  (authToken: string) => Promise<void>
> = {
  google: async () => {
    await new Promise((resolve) => gapi.load("client", resolve));
    await gapi.client.load(
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    );
  },
};

const setApiAuthToken: Record<
  Exclude<LoginProviderType, undefined>,
  (authToken: string) => Promise<void>
> = {
  google: async (authToken: string) => {
    gapi.client.setToken({ access_token: authToken });
  },
};

export function LoginProvider({ children }: { children: ReactNode }) {
  const [loginData, setLoginData, clearLoginData] = useLocalStorage<
    LoginDataType | undefined
  >("login-data", undefined);
  const [_, setProfile, removeProfile] = useProfile();
  const loadedApis = useRef<LoginProviderType[]>([]);

  console.log(loginData);

  useEffect(() => {
    if (loginData === undefined) {
      console.log("Removing profile");
      removeProfile();
    } else {
      const update = async () => {
        if (!loadedApis.current.includes(loginData.loginProvider)) {
          await loadApi[loginData.loginProvider](loginData.authToken);
          loadedApis.current.push(loginData.loginProvider);
        }
        await setApiAuthToken[loginData.loginProvider](loginData.authToken);
        getProfile[loginData.loginProvider]().then((profile) =>
          setProfile(profile),
        );
      };
      update();
    }
  }, [loginData, removeProfile, setProfile]);

  return (
    <LoginContext.Provider value={[loginData, setLoginData, clearLoginData]}>
      {children}
    </LoginContext.Provider>
  );
}
