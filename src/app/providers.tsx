"use client";

import LocalPreferencesInitializer from "@/components/LocalPreferencesInitializer";
import StoreProvider from "@/components/StoreProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <LocalPreferencesInitializer />

      {children}
    </StoreProvider>
  );
}
