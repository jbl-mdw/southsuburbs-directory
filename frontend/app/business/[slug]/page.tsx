import { notFound } from "next/navigation";
import { fetchBusinessBySlug } from "@/lib/directus";

interface PageProps {
  params: { slug: string };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = params;

  // Server-side fetch from Directus (no CORS issues)
  const business = await fetchBusinessBySlug(slug);

  if (!business) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-md w-full text-center">
          <div className="text-5xl mb-3">😕</div>
          <h1 className="text-xl font-semibold mb-2">Business Not Found</h1>
          <p className="text-gray-600 mb-4">
            This listing may have been removed or is not public yet.
          </p>
          <a
            href="/explore"
            className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            ← Back to Explore
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">{business.name}</h1>

        <div className="text-sm text-gray-600 mb-4 space-y-1">
          {business.address_line1 && <div>{business.address_line1}</div>}
          {(business.city || business.state || business.zipcode) && (
            <div>
              {business.city}, {business.state} {business.zipcode}
            </div>
          )}
          {business.phone && <div>📞 {business.phone}</div>}
          {business.website && (
            <div>
              🌐{" "}
              <a
                href={
                  business.website.startsWith("http")
                    ? business.website
                    : `https://${business.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {business.website}
              </a>
            </div>
          )}
        </div>

        {business.description && (
          <div className="border-t pt-4 mt-4 text-gray-800">
            <p>{business.description}</p>
          </div>
        )}
      </div>
    </main>
  );
}
