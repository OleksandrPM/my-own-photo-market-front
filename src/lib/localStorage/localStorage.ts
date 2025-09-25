import { LocalPreferencesState } from "types/localPreferencesState";

export const storageKey: string = process.env.LOCAL_STORAGE_KEY || "MyOPM-app";

export function getStorage(): LocalPreferencesState | undefined {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse localStorage:", error);

      return undefined;
    }
  } else {
    return undefined;
  }
}

export function setStorage(
  settings: LocalPreferencesState
): LocalPreferencesState | undefined {
  if (typeof window === "undefined") return;

  localStorage.setItem(storageKey, JSON.stringify(settings));

  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse localStorage:", error);

      return undefined;
    }
  } else {
    return undefined;
  }
}

export function deleteStorage() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(storageKey);

  return localStorage.getItem(storageKey);
}

// Try do not use this function, work with state, update all the localPreferences object
export function setStorageValue<K extends keyof LocalPreferencesState>(
  propName: K,
  value: LocalPreferencesState[K]
) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(storageKey);
  const currentSettings: LocalPreferencesState = stored
    ? JSON.parse(stored)
    : {};

  currentSettings[propName] = value;

  localStorage.setItem(storageKey, JSON.stringify(currentSettings));

  return getStorageValue(propName);
}

// Do not use this function, work with state for getting data
export function getStorageValue<K extends keyof LocalPreferencesState>(
  propName: K
): string | boolean | undefined {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      const settings = JSON.parse(stored);

      return settings[propName];
    } catch (error) {
      console.error("Failed to parse localStorage in getValue:", error);

      return undefined;
    }
  } else {
    return undefined;
  }
}
