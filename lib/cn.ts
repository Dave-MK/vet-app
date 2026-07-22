/** Join conditional class names. Last-write-wins is the caller's job. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
