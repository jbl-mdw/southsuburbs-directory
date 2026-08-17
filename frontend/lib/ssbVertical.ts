// SSB-REAL-ESTATE-DIRECTORY-OVERLAY-002 - real, generic Directory
// Platform reads for rendering a vertical NATIVELY inside South Suburbs
// Best itself (no tenant, no separate domain). "SSB" is a plain scope
// identity entity-store.js records are grouped under - never a
// registered Tenant - so this stays a real, reusable read path for any
// future vertical rendered the same way, not a Real-Estate-only client.

const GATEWAY_URL =
  process.env.DIRECTORY_PLATFORM_GATEWAY_URL || "http://lgr_connect_gateway:4120";

export type SsbEntityType = {
  entityTypeKey: string;
  label: string;
  storage: string;
  categorySlug: string | null;
};

export type SsbMonetizationSurface = {
  surfaceKey: string;
  label: string;
  signal: string;
};

export type SsbVertical = {
  verticalKey: string;
  verticalName: string;
  entityTypes: SsbEntityType[];
  monetizationSurfaces: SsbMonetizationSurface[];
};

export type SsbScopedEntity = {
  entityId: string;
  entityType: string;
  attributes: Record<string, unknown>;
  status: string;
};

export async function getVertical(verticalKey: string): Promise<SsbVertical | null> {
  try {
    const res = await fetch(`${GATEWAY_URL}/api/directory-platform/verticals/${encodeURIComponent(verticalKey)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.vertical || null;
  } catch {
    return null;
  }
}

export async function getScopedEntities(scopeId: string, entityType?: string): Promise<SsbScopedEntity[]> {
  try {
    const url = `${GATEWAY_URL}/api/directory-platform/scope/${encodeURIComponent(scopeId)}/entities${
      entityType ? `?entityType=${encodeURIComponent(entityType)}` : ""
    }`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.entities || [];
  } catch {
    return [];
  }
}
