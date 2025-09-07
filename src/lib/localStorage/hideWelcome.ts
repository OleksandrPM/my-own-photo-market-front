import { getValue, setValue } from "./localStorage";

export function switchHideWelcome() {
  const currentValue = getValue("hideWelcome");

  setValue("hideWelcome", !currentValue);

  return getValue("hideWelcome");
}

export function getHideWelcome(): boolean {
  const value = getValue("hideWelcome");

  return value as boolean;
}
