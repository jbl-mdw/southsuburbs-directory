export const site = {
  brand: {
    name: "South Suburbs Best",
    logoAlt: "South Suburbs Best",
  },
  colors: {
    primary: "#2563eb",
    accent:  "#0ea5e9",
  },
  nav: { variant: "A", showVoiceMic: false },
  layout: { homeVariant: "classic" },
  api: {
    directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL,
  },
};
