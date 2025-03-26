import { useEffect, useRef, useState } from "react";
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
  const hint = useRef<string | undefined>(undefined);

  useEffect(() => {
    createAuthMethodFromStorage();
  }, []);

  async function signIn(method: AuthMethodKey) {
    localStorage.setItem("@Auth.method", method);
    const auth = AuthMethod[method];
    setAuthMethod(auth);

    const user = await auth.signIn(hint.current);

    if (user != undefined) {
      await setUserLogged(auth);
    }
  }

  async function signOut() {
    if (authMethod) {
      setIsAuthenticated(false);
      setUser(undefined);
      await authMethod?.signOut();
      localStorage.removeItem("@Auth.method");
      localStorage.removeItem("@Auth.hint");
      hint.current = undefined;
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
    if (user) {
      hint.current = user.email;
      localStorage.setItem("@Auth.hint", user.email);
    }
  }

  async function createAuthMethodFromStorage() {
    const storageMethod = localStorage.getItem("@Auth.method");
    if (storageMethod) {
      const method = storageMethod as AuthMethodKey;
      const auth = AuthMethod[method];
      hint.current = localStorage.getItem("@Auth.hint") ?? undefined;
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
