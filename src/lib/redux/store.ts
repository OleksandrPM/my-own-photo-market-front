import { configureStore } from "@reduxjs/toolkit";
import localPreferencesReducer from "./features/local-preferences/localPreferencesSlice";
import tagsReducer from "./features/tags/tagsSlice";
import { api } from "@/lib/api/core/baseApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      localPreferences: localPreferencesReducer,
      tags: tagsReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
