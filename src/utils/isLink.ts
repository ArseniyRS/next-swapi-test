export function isLink(text: string) {
  return /http/g.test(text);
}
