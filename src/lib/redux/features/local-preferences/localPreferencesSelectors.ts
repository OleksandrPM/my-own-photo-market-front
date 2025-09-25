import { RootState } from "lib/redux/store";
import { LocalPreferencesState } from "types/localPreferencesState";

export const getLocalPreferences = (state: RootState): LocalPreferencesState =>
  state.localPreferences;

export const getHideWelcome = (
  state: RootState
): LocalPreferencesState["hideWelcome"] => state.localPreferences.hideWelcome;

export const getTheme = (state: RootState): LocalPreferencesState["theme"] =>
  state.localPreferences.theme;
