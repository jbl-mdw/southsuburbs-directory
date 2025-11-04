import React from "react";

export function TestimonialSection({
  quote,
  authorName,
  authorCity,
}: {
  quote?: string;
  authorName?: string;
  authorCity?: string;
}) {
  if (!quote) return null;

  return (
    <section className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="text-xl font-medium leading-relaxed mb-6">
          “{quote}”
        </div>
        <div className="text-sm text-gray-300">
          {authorName || "Verified Homeowner"}
          {authorCity ? ` • ${authorCity}` : ""}
        </div>
      </div>
    </section>
  );
}
