import React from "react";

type ClaimProps = {
  headline?: string;
  points?: string[];
};

export function ClaimSection({ headline, points }: ClaimProps) {
  return (
    <section className="bg-blue-50 py-12">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {headline || "Claim your spot. Get more calls. Close more jobs."}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-left md:text-center">
          {(points && points.length
            ? points
            : [
                "Claim your listing",
                "Promote your services",
                "Convert real local customers",
              ]
          ).map((pt, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white border shadow p-5"
            >
              <div className="text-base font-semibold text-gray-900 mb-2">
                {pt}
              </div>
              <div className="text-sm text-gray-600">
                We highlight you in front of homeowners ready to hire now.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
