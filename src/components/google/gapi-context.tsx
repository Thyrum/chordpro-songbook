import { createContext, useEffect, useRef } from "react";
import { useGoogleCredentials } from "./google-hooks";

const GapiContext = createContext<typeof gapi.client>(gapi.client);

function GapiProvider() {
  const [credentials] = useGoogleCredentials();

  type callbackType = <T,>(client: typeof gapi.client) => T;

  const gapiCallback = (callback: <T,>((client: typeof gapi.client) => T)) => {

  }

  return <GapiContext.Provider value={<T>T>(callback: )}></GapiContext.Provider>;
}
