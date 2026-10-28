export function assetUrl(relativePath: string): string {
  const path = relativePath.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${path}`;
}
