import { useLocalStorage } from "usehooks-ts";

type useSyncedStorageOptions<T> = {
    /** A function to serialize the value before storing it. */
    serializer?: (value: T) => string;
    /** A function to deserialize the stored value. */
    deserializer?: (value: string) => T;
}

export function useSyncedStorage<T>(key: string, initialValue: T | (() => T), options: ) {
  const [value, setValue] = useLocalStorage(key, initialValue, options);


}
