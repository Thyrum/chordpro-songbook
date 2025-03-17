import { useEffect, useState } from "react";
import {
  AuthMethod,
  AuthMethodKey,
  AuthProviderProps,
  User,
} from "./auth.model";
import { IAuth } from "./i-auth";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState<IAuth>();

  useEffect(() => {
    createAuthMethodFromStorage();
  }, []);

  async function signIn(method: AuthMethodKey) {
    localStorage.setItem("@Auth.method", method);
    const auth = AuthMethod[method];
    setAuthMethod(auth);

    const user = await auth.signIn();

    if (user != undefined) {
      await setUserLogged(auth);
    }
  }

  function signOut() {
    if (authMethod) {
      setIsAuthenticated(false);
      setUser(undefined);
      authMethod?.signOut();
      localStorage.removeItem("@Auth.method");
      localStorage.removeItem("@Auth.user");
    } else {
      console.error("auth method undefined");
    }
  }

  useEffect(() => {
    if (authMethod) {
      setUserLogged(authMethod);
    }
  }, [authMethod]);

  async function setUserLogged(authMethod: IAuth) {
    const isAuthenticated = await authMethod.isAuthenticated();
    setIsAuthenticated(isAuthenticated);
    const user = await authMethod.getUser();
    setUser(user);
  }

  async function createAuthMethodFromStorage() {
    const storageMethod = localStorage.getItem("@Auth.method");
    if (storageMethod) {
      const method = storageMethod as AuthMethodKey;
      const auth = AuthMethod[method];
      setAuthMethod(auth);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        authMethodType: authMethod?.type ?? "undefined",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
