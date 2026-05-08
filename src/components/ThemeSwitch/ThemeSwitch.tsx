"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/react-redux-hooks";
import { useSystemThemeListener } from "@/lib/hooks/useSystemThemeListener";
import { getTheme } from "@/lib/redux/features/local-preferences/localPreferencesSelectors";
import { ColorTheme } from "@/types/color-theme/color-theme.types";
import setThemeAttribute from "@/lib/utils/setThemeAttribute";
import { setTheme } from "@/lib/redux/features/local-preferences/localPreferencesSlice";

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
    <select
      value={theme}
      onChange={onChangeHandler}
      name="themeSelector"
      title="Select theme"
    >
      <option value={ColorTheme.LIGHT}>Light</option>
      <option value={ColorTheme.DARK}>Dark</option>
      <option value={ColorTheme.SYSTEM}>System</option>
    </select>
  );
}

export default ThemeSwitch;
