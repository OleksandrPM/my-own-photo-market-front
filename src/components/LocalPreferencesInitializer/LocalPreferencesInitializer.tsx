"use client";

import { useEffect } from "react";
import { useAppDispatch } from "lib/hooks/react-redux-hooks";
import { hydratePreferences } from "lib/redux/features/local-preferences/localPreferencesSlice";
import { getStorage } from "lib/localStorage/localStorage";

export default function LocalPreferencesInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = getStorage();
    if (stored) {
      dispatch(hydratePreferences(stored));
    }
  }, [dispatch]);

  return null;
}
