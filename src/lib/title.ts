/**
 * If the string is entirely uppercase (with no lowercase letters), convert to
 * a Portuguese-friendly title case, leaving short connectors lowercase.
 * Strings that already have mixed case are returned unchanged.
 */
const SMALL_WORDS = new Set([
  "a", "o", "as", "os", "e", "ou", "de", "da", "do", "das", "dos",
  "em", "no", "na", "nos", "nas", "por", "para", "com", "sem", "um", "uma",
  "ao", "à", "às", "aos", "que",
]);

export function normalizeTitle(input: string): string {
  if (!input) return input;
  const hasLower = /[a-záéíóúâêîôûãõàç]/.test(input);
  if (hasLower) return input;

  const lower = input.toLowerCase();
  return lower
    .split(/(\s+|[-–—:])/)
    .map((token, i) => {
      if (/^\s+$/.test(token) || /^[-–—:]$/.test(token)) return token;
      if (i !== 0 && SMALL_WORDS.has(token)) return token;
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join("");
}
