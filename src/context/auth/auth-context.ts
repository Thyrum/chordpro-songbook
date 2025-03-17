import { createContext } from "react";
import { AuthContextData } from "./auth.model";

export const AuthContext = createContext({} as AuthContextData);
