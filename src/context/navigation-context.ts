import { createContext } from "react";

export type NavigationContextType = {
  setDrawerOpen: (open: boolean) => void;
  isMobile: boolean;
};

export const NavigationContext = createContext<NavigationContextType>({
  setDrawerOpen: () => {},
  isMobile: false,
});
