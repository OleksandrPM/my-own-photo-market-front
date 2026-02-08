export const toCamelCasePreserveFirst = (str: string): string => {
  const cleaned = str
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, " ");

  if (!cleaned) return "";

  const firstChar = cleaned[0]; // preserve original capitalization

  return (
    firstChar +
    cleaned
      .slice(1)
      .toLowerCase()
      .replace(/ (\w)/g, (_, c) => c.toUpperCase())
  );
};
