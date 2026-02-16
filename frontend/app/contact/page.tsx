export const dynamic = "force-dynamic";
export const revalidate = 0;


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">
          Contact South Suburbs Best
        </h1>
        <p className="text-lg mb-4">
          Have a question, want to feature your business, or suggest a local favorite?
          We’d love to hear from you.
        </p>

        <div className="bg-white shadow rounded-xl p-6 space-y-3">
          <p><span className="font-semibold">Email:</span> leadsgrowrevenue@gmail.com</p>
          <p><span className="font-semibold">Phone:</span> (708) 285-0679</p>
          <p className="text-sm text-gray-500">
            You can also use the contact form on this page once it’s wired into your backend.
          </p>
        </div>
      </section>
    </main>
  );
}
