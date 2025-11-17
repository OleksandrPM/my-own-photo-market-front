import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStorage } from "lib/localStorage/localStorage";
import { ColorTheme } from "types/colorTheme";
import { LocalPreferencesState } from "types/localPreferencesState";

const initialState: LocalPreferencesState = {
  hideWelcome: false,
  theme: ColorTheme.LIGHT,
};

const localPreferencesSlice = createSlice({
  name: "localPreferences",
  initialState,
  reducers: {
    hydratePreferences(state, action: PayloadAction<LocalPreferencesState>) {
      return { ...state, ...action.payload };
    },
    setHideWelcome(state, action: PayloadAction<boolean>) {
      state.hideWelcome = action.payload;
      setStorage(state);
    },
    setTheme(state, action: PayloadAction<ColorTheme>) {
      state.theme = action.payload;
      setStorage(state);
    },
  },
});

export const { hydratePreferences, setHideWelcome, setTheme } =
  localPreferencesSlice.actions;

export default localPreferencesSlice.reducer;
