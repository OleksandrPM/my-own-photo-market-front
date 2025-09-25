import { ColorTheme } from "types/colorTheme";

const attribute: string = "data-mode";
const media: string = "(prefers-color-scheme: dark)";

export default function setThemeAttribute(mode: ColorTheme) {
  const element = document.body;

  if (mode === ColorTheme.SYSTEM) {
    const isPrefersDark = window.matchMedia(media).matches;
    element.setAttribute(
      attribute,
      isPrefersDark ? ColorTheme.DARK : ColorTheme.LIGHT
    );

    // Optional: listen for system changes
    window.matchMedia(media).addEventListener("change", (e) => {
      element.setAttribute(
        attribute,
        e.matches ? ColorTheme.DARK : ColorTheme.LIGHT
      );
    });
  } else {
    element.setAttribute(attribute, mode); // 'dark' or 'light'
  }
}
