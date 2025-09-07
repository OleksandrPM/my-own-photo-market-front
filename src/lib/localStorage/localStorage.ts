export interface IStorageSettings {
  hideWelcome?: boolean;
  controlWord?: string;
}

export const storageKey: string = "MyOPM-app";

export function setStorage(
  settings: IStorageSettings
): IStorageSettings | undefined {
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

export function setValue<K extends keyof IStorageSettings>(
  propName: K,
  value: IStorageSettings[K]
) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(storageKey);
  const currentSettings: IStorageSettings = stored ? JSON.parse(stored) : {};

  currentSettings[propName] = value;

  localStorage.setItem(storageKey, JSON.stringify(currentSettings));

  return getValue(propName);
}

export function getValue<K extends keyof IStorageSettings>(
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
