import React from "react";

const updateEventKey = "localStorageUpdate";

if (typeof window !== "undefined") {
  const nativeStorage = window?.localStorage;

  class CustomStorage {
    constructor() {}

    getItem(key: string) {
      let value = JSON.parse(nativeStorage.getItem(key) || "null");
      return value;
    }
    setItem<T>(key: string, value: T) {
      const stringifiedValue = JSON.stringify(value);
      nativeStorage.setItem(key, stringifiedValue);
      let setEvent = new CustomEvent(updateEventKey);
      window.dispatchEvent(setEvent);
    }

    removeItem(key: string) {
      nativeStorage.removeItem(key);
      let setEvent = new CustomEvent(updateEventKey);
      window.dispatchEvent(setEvent);
    }
    clear() {
      nativeStorage.clear();
    }
  }

  Object.defineProperty(window, "localStorage", {
    value: new CustomStorage(),
  });
}

let isSubscribedToSetEvent = false;

export function useLocalStorage(key: string) {
  const [value, setValue] = React.useState(() => {
    let storedValue = {};
    if (typeof window !== "undefined") {
      storedValue = window.localStorage.getItem(key) || {};
    }
    return storedValue;
  });

  const handleStorageUpdate = () => {
    let value = window.localStorage.getItem(key);
    setValue(value);
  };

  React.useEffect(() => {
    if (!isSubscribedToSetEvent) {
      isSubscribedToSetEvent = true;
      window.addEventListener(updateEventKey, handleStorageUpdate);
      return () =>
        window.removeEventListener(updateEventKey, handleStorageUpdate);
    }
  }, []);

  return value;
}
