// Central route builders. Use these instead of string-building paths in
// components so route conventions can change in one place.
export const routes = {
  home: "/",
  project: (slug: string) => `/projects/${slug}`,
} as const;
