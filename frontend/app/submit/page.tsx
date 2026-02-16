export const dynamic = "force-dynamic";
export const revalidate = 0;


import Link from "next/link";
import { Check } from "lucide-react";

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">List Your Business</h1>
          <p className="text-lg text-gray-600">Choose the plan that works best for you</p>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {/* STARTER */}
          <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Starter
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">Free</div>
              <div className="text-sm text-gray-500">10-day listing</div>
            </div>

            <div className="p-8">
              <ul className="space-y-3 mb-8 text-sm">
                <Feature text="Basic business profile" />
                <Feature text="Contact information" />
                <Feature text="Location on map" />
                <Feature text="Up to 3 photos" />
                <Feature text="Business hours" />
              </ul>

              <Link
                href="/submit/starter"
                className="block w-full border border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white text-center py-2.5 rounded-lg font-medium transition"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* PROFESSIONAL (Featured) */}
          <div className="bg-white rounded-xl border-2 border-blue-600 relative overflow-hidden shadow-lg">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>

            <div className="p-8 border-b border-gray-100">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                Professional
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">$10.50</div>
              <div className="text-sm text-gray-500">20-day listing</div>
            </div>

            <div className="p-8 bg-gray-50">
              <ul className="space-y-3 mb-8 text-sm">
                <Feature text="Enhanced business profile" />
                <Feature text="Priority placement" />
                <Feature text="Contact information" />
                <Feature text="Location on map" />
                <Feature text="Up to 8 photos" />
                <Feature text="Video showcase" />
                <Feature text="Website & social links" />
                <Feature text="Custom tagline" />
              </ul>

              <Link
                href="/submit/professional"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-lg font-medium transition"
              >
                Select Plan
              </Link>
            </div>
          </div>

          {/* PREMIUM */}
          <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Premium
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">$31.50</div>
              <div className="text-sm text-gray-500">60-day listing</div>
            </div>

            <div className="p-8">
              <ul className="space-y-3 mb-8 text-sm">
                <Feature text="Premium business profile" />
                <Feature text="Featured badge" />
                <Feature text="Top of category placement" />
                <Feature text="Contact information" />
                <Feature text="Location on map" />
                <Feature text="Unlimited photos" />
                <Feature text="Video showcase" />
                <Feature text="Website & social links" />
                <Feature text="Custom tagline" />
                <Feature text="Priority support" />
              </ul>

              <Link
                href="/submit/premium"
                className="block w-full border border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white text-center py-2.5 rounded-lg font-medium transition"
              >
                Select Plan
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Questions?{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
      <span className="text-gray-700">{text}</span>
    </li>
  );
}
