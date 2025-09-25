"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "lib/hooks/react-redux-hooks";
import { getTheme } from "lib/redux/features/local-preferences/localPreferencesSelectors";
import { setTheme } from "lib/redux/features/local-preferences/localPreferencesSlice";
import { ColorTheme } from "types/colorTheme";
import setThemeAttribute from "lib/utils/setThemeAttribute";
import { useSystemThemeListener } from "lib/hooks/useSystemThemeListener";

export function ThemeSwitch() {
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();

  useSystemThemeListener(theme === ColorTheme.SYSTEM);

  useEffect(() => {
    setThemeAttribute(theme);
  }, [theme]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenTheme = event.target.value as ColorTheme;
    dispatch(setTheme(chosenTheme));
  };

  return (
    <select value={theme} onChange={onChangeHandler} title="theme">
      <option value={ColorTheme.LIGHT}>Light</option>
      <option value={ColorTheme.DARK}>Dark</option>
      <option value={ColorTheme.SYSTEM}>System</option>
    </select>
  );
}

export default ThemeSwitch;
