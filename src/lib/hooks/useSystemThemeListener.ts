import { useEffect } from "react";
import { ColorTheme } from "@/types/color-theme/color-theme.types";

const attribute = "data-mode";
const media = "(prefers-color-scheme: dark)";

export function useSystemThemeListener(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const mediaQuery = window.matchMedia(media);

    const updateTheme = (e: MediaQueryListEvent) => {
      document.body.setAttribute(
        attribute,
        e.matches ? ColorTheme.DARK : ColorTheme.LIGHT,
      );
    };

    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [enabled]);
}
