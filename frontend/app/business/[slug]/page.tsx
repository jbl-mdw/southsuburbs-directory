import { notFound } from "next/navigation";
import {
  getBusinessBySlug,
  getAllBusinessSlugs,
  type Business,
} from "@/lib/directus";

export const revalidate = 60;

type PageParams = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = await getAllBusinessSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BusinessPage({ params }: PageParams) {
  const slug = decodeURIComponent(params.slug);
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <section className="border-b pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          {business.name}
        </h1>

        {business.tagline && (
          <p className="mt-2 text-lg text-gray-600">{business.tagline}</p>
        )}

        {business.city && business.state && (
          <p className="mt-1 text-sm text-gray-500">
            {business.city}, {business.state}
          </p>
        )}
      </section>

      {/* Main content + sidebar */}
      <section className="mt-6 grid gap-8 md:grid-cols-[2fr,1fr]">
        {/* Left: description + services */}
        <div className="space-y-4">
          {business.description && (
            <p className="text-gray-700 leading-relaxed">
              {business.description}
            </p>
          )}

          {business.services_text && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Services</h2>
              <p className="whitespace-pre-line text-gray-700">
                {business.services_text}
              </p>
            </div>
          )}
        </div>

        {/* Right: contact card */}
        <aside className="space-y-3 rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
          {business.phone && (
            <div>
              <div className="font-semibold">Phone</div>
              <a
                href={`tel:${business.phone}`}
                className="text-blue-600 hover:underline"
              >
                {business.phone}
              </a>
            </div>
          )}

          {business.email && (
            <div>
              <div className="font-semibold">Email</div>
              <a
                href={`mailto:${business.email}`}
                className="text-blue-600 hover:underline break-all"
              >
                {business.email}
              </a>
            </div>
          )}

          {(business.address1 ||
            business.city ||
            business.state ||
            business.postal_code) && (
            <div>
              <div className="font-semibold">Address</div>
              <p className="whitespace-pre-line">
                {business.address1 && (
                  <>
                    {business.address1}
                    <br />
                  </>
                )}
                {(business.city || business.state || business.postal_code) && (
                  <>
                    {business.city}
                    {business.city &&
                    (business.state || business.postal_code)
                      ? ", "
                      : ""}
                    {business.state} {business.postal_code}
                  </>
                )}
              </p>
            </div>
          )}

          {business.website && (
            <div>
              <div className="font-semibold">Website</div>
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {business.website}
              </a>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
