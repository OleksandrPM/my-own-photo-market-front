import { configureStore } from "@reduxjs/toolkit";
import localPreferencesReducer from "./features/local-preferences/localPreferencesSlice";
import authReducer from "./features/auth/authSlice";
import tagsReducer from "./features/tags/tagsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      localPreferences: localPreferencesReducer,
      auth: authReducer,
      tags: tagsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
