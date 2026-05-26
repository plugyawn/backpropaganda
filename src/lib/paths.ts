const rawBasePath = import.meta.env.BASE_URL;

export const basePath = rawBasePath.endsWith("/") ? rawBasePath : `${rawBasePath}/`;

export function withBase(path: string) {
  return `${basePath}${path.replace(/^\/+/, "")}`;
}

export function stripBase(pathname: string) {
  if (basePath === "/") return pathname;
  const baseRoot = basePath.replace(/\/$/, "");
  if (pathname === baseRoot) return "/";
  return pathname.startsWith(basePath)
    ? `/${pathname.slice(basePath.length).replace(/^\/+/, "")}`
    : pathname;
}
