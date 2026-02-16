"use client";

import { useMemo, useState } from "react";

type Props = {
  plan: "starter" | "professional" | "premium";
};

const PLAN_LABEL: Record<Props["plan"], string> = {
  starter: "Starter",
  professional: "Professional",
  premium: "Premium",
};

const PLAN_HINT: Record<Props["plan"], string> = {
  starter: "Best for trying us out.",
  professional: "Best value for most businesses.",
  premium: "Max visibility + featured placement.",
};

export default function SubmitListingForm({ plan }: Props) {
  const [openSection, setOpenSection] = useState<
    "business" | "location" | "contact" | "hours" | "media" | "review" | null
  >("business");

  const [data, setData] = useState<Record<string, any>>({
    plan,
    businessName: "",
    tagline: "",
    category: "",
    priceRange: "",
    description: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    website: "",
    hours: {
      mon: { open: "", close: "" },
      tue: { open: "", close: "" },
      wed: { open: "", close: "" },
      thu: { open: "", close: "" },
      fri: { open: "", close: "" },
      sat: { open: "", close: "" },
      sun: { open: "", close: "" },
    },
    photos: [] as File[],
    notes: "",
  });

  const completion = useMemo(() => {
    const required = [
      "businessName",
      "category",
      "description",
      "address1",
      "city",
      "state",
      "zip",
      "phone",
      "email",
    ];
    const filled = required.filter((k) => String(data[k] ?? "").trim().length > 0).length;
    return Math.round((filled / required.length) * 100);
  }, [data]);

  function setField(name: string, value: any) {
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function setHours(day: string, key: "open" | "close", value: string) {
    setData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...prev.hours[day], [key]: value },
      },
    }));
  }

  function onPhotos(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 8);
    setData((prev) => ({ ...prev, photos: arr }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to Directus/N8N later
    console.log("SUBMIT LISTING:", data);
    alert("Submitted (stub). Next step: wire to Directus + payment.");
  }

  const Section = ({
    id,
    title,
    subtitle,
    children,
  }: {
    id: NonNullable<typeof openSection>;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) => {
    const isOpen = openSection === id;
    return (
      <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-gray-50"
          onClick={() => setOpenSection(isOpen ? null : id)}
          aria-expanded={isOpen}
        >
          <div>
            <div className="font-semibold text-gray-900">{title}</div>
            {subtitle ? <div className="text-sm text-gray-500 mt-0.5">{subtitle}</div> : null}
          </div>
          <div className="text-gray-500 mt-1">{isOpen ? "–" : "+"}</div>
        </button>
        {isOpen ? <div className="px-5 pb-5 pt-1">{children}</div> : null}
      </div>
    );
  };

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className={[
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none",
        "focus:ring-2 focus:ring-blue-200 focus:border-blue-400",
        props.className ?? "",
      ].join(" ")}
    />
  );

  const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
      {...props}
      className={[
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none",
        "focus:ring-2 focus:ring-blue-200 focus:border-blue-400",
        props.className ?? "",
      ].join(" ")}
    />
  );

  const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
      {...props}
      className={[
        "w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none bg-white",
        "focus:ring-2 focus:ring-blue-200 focus:border-blue-400",
        props.className ?? "",
      ].join(" ")}
    />
  );

  return (
    <main className="max-w-[1100px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Submit Your Business Listing
          </h1>
          <p className="text-gray-600 mt-1">
            Fill out the details below. Once submitted, we’ll review and publish your listing.
          </p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
          <div className="text-sm text-blue-900 font-semibold">
            Selected Plan: {PLAN_LABEL[plan]}
          </div>
          <div className="text-xs text-blue-800/80 mt-1">{PLAN_HINT[plan]}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Completion</span>
          <span>{completion}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
          <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-8 space-y-4">
          <Section
            id="business"
            title="Business Information"
            subtitle="Tell visitors what you do and what makes you stand out."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Business Name *</label>
                <Input
                  value={data.businessName}
                  onChange={(e) => setField("businessName", e.target.value)}
                  placeholder='e.g., "Southland HVAC Pros"'
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Tagline</label>
                <Input
                  value={data.tagline}
                  onChange={(e) => setField("tagline", e.target.value)}
                  placeholder='e.g., "Fast service • Fair pricing"'
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Category *</label>
                <Select
                  value={data.category}
                  onChange={(e) => setField("category", e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Roofing">Roofing</option>
                  <option value="Landscaping">Landscaping</option>
                  <option value="Water Damage Restoration">Water Damage Restoration</option>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Price Range</label>
                <Select
                  value={data.priceRange}
                  onChange={(e) => setField("priceRange", e.target.value)}
                >
                  <option value="">Select (optional)</option>
                  <option value="$">$ (Budget)</option>
                  <option value="$$">$$ (Mid-range)</option>
                  <option value="$$$">$$$ (Premium)</option>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Description *</label>
              <Textarea
                value={data.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={5}
                placeholder="Write a clear description of your services, service area, and what makes you the best choice."
                required
              />
              <div className="text-xs text-gray-500 mt-2">
                Tip: Mention the cities you serve (Orland Park, Tinley Park, Frankfort, Homewood).
              </div>
            </div>
          </Section>

          <Section id="location" title="Location" subtitle="Help customers find you locally.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Address Line 1 *</label>
                <Input
                  value={data.address1}
                  onChange={(e) => setField("address1", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Address Line 2</label>
                <Input
                  value={data.address2}
                  onChange={(e) => setField("address2", e.target.value)}
                  placeholder="Suite, unit, etc. (optional)"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">City *</label>
                <Input
                  value={data.city}
                  onChange={(e) => setField("city", e.target.value)}
                  placeholder="e.g., Orland Park"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">State *</label>
                  <Input
                    value={data.state}
                    onChange={(e) => setField("state", e.target.value)}
                    placeholder="IL"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">ZIP *</label>
                  <Input
                    value={data.zip}
                    onChange={(e) => setField("zip", e.target.value)}
                    placeholder="60462"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500">
              Map preview placeholder (we can wire Google Maps later)
            </div>
          </Section>

          <Section id="contact" title="Contact Details" subtitle="How customers can reach you.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Phone *</label>
                <Input
                  value={data.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="(708) 555-1234"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <Input
                  value={data.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@business.com"
                  type="email"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Website</label>
                <Input
                  value={data.website}
                  onChange={(e) => setField("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </Section>

          <Section id="hours" title="Business Hours" subtitle="Optional but recommended.">
            <div className="space-y-3">
              {(
                [
                  ["mon", "Monday"],
                  ["tue", "Tuesday"],
                  ["wed", "Wednesday"],
                  ["thu", "Thursday"],
                  ["fri", "Friday"],
                  ["sat", "Saturday"],
                  ["sun", "Sunday"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-4 font-medium text-gray-700">{label}</div>
                  <div className="sm:col-span-4">
                    <Input
                      value={data.hours[key].open}
                      onChange={(e) => setHours(key, "open", e.target.value)}
                      placeholder="Open (e.g., 9:00 AM)"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <Input
                      value={data.hours[key].close}
                      onChange={(e) => setHours(key, "close", e.target.value)}
                      placeholder="Close (e.g., 5:00 PM)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="media" title="Photos & Media" subtitle="Boost conversions with real photos.">
            <div className="flex flex-col gap-3">
              <Input type="file" accept="image/*" multiple onChange={(e) => onPhotos(e.target.files)} />
              <div className="text-xs text-gray-500">
                Upload up to 8 photos (we’ll enforce plan limits later when payments are wired).
              </div>
              {data.photos?.length ? (
                <ul className="text-sm text-gray-700 list-disc pl-5">
                  {data.photos.map((f: File) => (
                    <li key={f.name}>{f.name}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Section>

          <Section id="review" title="Review & Submit" subtitle="Final checks before submission.">
            <div className="text-sm text-gray-700 space-y-2">
              <div><span className="font-semibold">Business:</span> {data.businessName || "—"}</div>
              <div><span className="font-semibold">Category:</span> {data.category || "—"}</div>
              <div><span className="font-semibold">Location:</span> {data.city ? `${data.city}, ${data.state} ${data.zip}` : "—"}</div>
              <div className="pt-3">
                <label className="text-sm font-medium text-gray-700">Notes for reviewer (optional)</label>
                <Textarea
                  value={data.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  rows={3}
                  placeholder="Anything we should know?"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md"
              >
                Submit Listing
              </button>
              <span className="text-xs text-gray-500">
                Submission goes to review before publishing.
              </span>
            </div>
          </Section>
        </div>

        {/* Right: Sticky sidebar */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-5 sticky top-24">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900">Submission Summary</div>
              <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {PLAN_LABEL[plan]}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between"><span className="text-gray-500">Business</span><span>{data.businessName || "—"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Category</span><span>{data.category || "—"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Price Range</span><span>{data.priceRange || "—"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Location</span><span>{data.city ? data.city : "—"}</span></div>
            </div>

            <div className="mt-5 border-t pt-4">
              <div className="text-xs text-gray-500 flex items-center justify-between">
                <span>Completion</span>
                <span>{completion}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-2 bg-blue-600" style={{ width: `${completion}%` }} />
              </div>
            </div>

            <div className="mt-5 text-xs text-gray-500">
              After submission, we’ll review for accuracy and publish your listing.
            </div>
          </div>

          <div className="border border-blue-200 rounded-xl bg-blue-50 p-5">
            <div className="font-semibold text-blue-900">Need help?</div>
            <div className="text-sm text-blue-800/90 mt-1">
              Submit the basics — we’ll follow up if anything is missing.
            </div>
            <a className="text-sm font-semibold text-blue-700 mt-3 inline-block" href="/contact">
              Contact support →
            </a>
          </div>
        </aside>
      </form>
    </main>
  );
}
