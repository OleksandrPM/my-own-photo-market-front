export const joinUrl = (...parts: string[]) =>
  parts
    .map((p) => p.replace(/^\/+|\/+$/g, "")) // trim /
    .filter(Boolean)
    .join("/");

export const withLeadingSlash = (p: string) =>
  p.startsWith("/") ? p : `/${p}`;
