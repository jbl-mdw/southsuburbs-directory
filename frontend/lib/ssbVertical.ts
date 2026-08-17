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

// REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - a resolved relationship
// edge (e.g. agent_lists_property), resolved server-side by the gateway
// against the real Directus businesses collection - never a second
// agent lookup here. `listingAgent`/`directoryOwner`/`leadDestination`
// are convenience projections of the same real resolution; `brokerage`
// is a real, disclosed structural gap (no brokerage relationship data
// exists yet), never a fabricated placeholder.
export type SsbResolvedBusiness = { id: string; name: string; slug: string; phone: string | null; email: string | null; categorySlug: string | null };
export type SsbResolvedRelationship = { relationshipKey: string; toEntityId: string; resolved: SsbResolvedBusiness | null };
export type SsbLeadDestination =
  | { type: "agent"; name: string; email: string }
  | { type: "directory_owner"; name: string; email: string }
  | { type: "platform_default"; clientId: string };

export type SsbScopedEntity = {
  entityId: string;
  tenantId: string;
  entityType: string;
  attributes: Record<string, unknown>;
  status: string;
  resolvedRelationships?: SsbResolvedRelationship[];
  listingAgent?: SsbResolvedBusiness | null;
  brokerage?: { resolved: false; gapReason: string };
  directoryOwner?: { name: string; email: string } | null;
  leadDestination?: SsbLeadDestination;
};

// REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - the canonical
// property search/filter field set the gateway's generic
// attribute-filter mapping understands (see buildPropertyAttributeFilters
// in server.js). Every field is optional; an empty/undefined filters
// object is byte-identical to calling getScopedEntities() with none.
export type SsbEntityFilters = {
  city?: string;
  zipcode?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
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

export async function getScopedEntities(scopeId: string, entityType?: string, filters?: SsbEntityFilters): Promise<SsbScopedEntity[]> {
  try {
    const params = new URLSearchParams();
    if (entityType) params.set("entityType", entityType);
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
      }
    }
    const query = params.toString();
    const url = `${GATEWAY_URL}/api/directory-platform/scope/${encodeURIComponent(scopeId)}/entities${query ? `?${query}` : ""}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.entities || [];
  } catch {
    return [];
  }
}
