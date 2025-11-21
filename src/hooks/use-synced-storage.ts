import { useCallback, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { FileApiContext } from "@context/file-api-context";
import { useAuth } from "./use-auth";

type useSyncedStorageOptions<T> = {
  /** A function to serialize the value before storing it. */
  serializer?: (value: T) => string;
  /** A function to deserialize the stored value. */
  deserializer?: (value: string) => T;
  preferRemoteOverInitial?: boolean;
};

type StoredValueType = {
  lastModified: number;
  content: string;
};

export function useSyncedStorage<T>(
  key: string,
  initialValue: T,
  {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    preferRemoteOverInitial = true,
  }: useSyncedStorageOptions<T>,
): [T, (newValue: T) => void, () => void, () => void] {
  const auth = useAuth();
  const { getFile, saveFile, deleteFile } = useContext(FileApiContext);
  const storedInitialValue: StoredValueType = {
    // Stringify the value again becuase we don't know what 'content' looks like
    content: JSON.stringify(serializer(initialValue)),
    lastModified: preferRemoteOverInitial ? 0 : Date.now(),
  };
  const [localValue, setLocalValue, clearLocalValue] = useLocalStorage(
    "synced-" + key,
    storedInitialValue,
  );
  const syncValue = useCallback(async () => {
    const remoteFile = await getFile(key);
    console.log("Found remote file:", remoteFile);
    let remoteLastModified = 0;
    let remoteValue: StoredValueType | null = null;
    if (remoteFile !== null) {
      remoteValue = JSON.parse(remoteFile) as StoredValueType;
      console.log("Found remote value:", remoteValue);
      remoteLastModified = remoteValue.lastModified;
    }
    if (localValue.lastModified > remoteLastModified) {
      console.log("Saving value to remote:", localValue);
      await saveFile(key, JSON.stringify(localValue), "application/json");
    } else if (localValue.lastModified < remoteLastModified) {
      setLocalValue(remoteValue!);
    }
  }, [getFile, key, localValue, saveFile, setLocalValue]);

  const clearValue = useCallback(async () => {
    clearLocalValue();
    await deleteFile(key);
  }, [clearLocalValue, deleteFile, key]);

  const setValue = useCallback(
    async (value: T) => {
      const newStoredValue: StoredValueType = {
        content: JSON.stringify(serializer(value)),
        lastModified: Date.now(),
      };
      setLocalValue(newStoredValue);
    },
    [serializer, setLocalValue],
  );

  useEffect(() => {
    if (auth.authMethodType !== undefined && auth.isAuthenticated) {
      syncValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authMethodType, auth.isAuthenticated]);

  console.log("Current localValue:", localValue);
  return [
    deserializer(JSON.parse(localValue.content)),
    setValue,
    syncValue,
    clearValue,
  ];
}
