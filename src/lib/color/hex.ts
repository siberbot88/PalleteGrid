export function isValidHex(input: string): boolean {
  return /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(input.trim());
}

export function normalizeHex(input: string): string | null {
  const value = input.trim().replace(/^#/, "");
  if (!isValidHex(value)) return null;
  const expanded =
    value.length === 3
      ? value
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : value;
  return `#${expanded.toUpperCase()}`;
}
