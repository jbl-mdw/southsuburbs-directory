export default function ListingsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">
          Explore South Suburbs Best Listings
        </h1>
        <p className="text-lg mb-6">
          Browse featured businesses, restaurants, shops, and local services across the
          Chicago South Suburbs. Use the search and filters to narrow down by city,
          category, or vibe.
        </p>

        {/* Later: replace this with your real directory component */}
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-600">
            Directory results will appear here. This page can plug into your existing
            business listing grid / cards once they’re wired up.
          </p>
        </div>
      </section>
    </main>
  );
}
