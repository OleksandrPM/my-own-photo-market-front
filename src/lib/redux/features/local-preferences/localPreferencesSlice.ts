import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColorTheme } from "types/colorTheme";

export interface LocalPreferencesState {
  hideWelcome: boolean;
  theme: ColorTheme;
}

const defaultState = { hideWelcome: false, theme: ColorTheme.LIGHT };

const storageKey: string = "MyOPM-app";

const loadState = (): LocalPreferencesState => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  }
  return defaultState;
};

const localPreferencesSlice = createSlice({
  name: "localPreferences",
  initialState: loadState(),
  reducers: {
    setHideWelcome(state, action: PayloadAction<boolean>) {
      state.hideWelcome = action.payload;
      localStorage.setItem(storageKey, JSON.stringify(state));
    },
    setTheme(
      state,
      action: PayloadAction<
        ColorTheme.DARK | ColorTheme.LIGHT | ColorTheme.SYSTEM
      >
    ) {
      state.theme = action.payload;
      localStorage.setItem(storageKey, JSON.stringify(state));
    },
  },
});

export const { setHideWelcome, setTheme } = localPreferencesSlice.actions;
export default localPreferencesSlice.reducer;
