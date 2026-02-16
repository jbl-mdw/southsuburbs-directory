"use client";

import { useMemo, useState } from "react";

type FormState = {
  // Business
  businessName: string;
  tagline: string;
  category: string;
  description: string;

  // Location
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;

  // Contact
  phone: string;
  email: string;
  website: string;

  // Hours
  mon: string; tue: string; wed: string; thu: string; fri: string; sat: string; sun: string;

  // Social
  facebook: string;
  instagram: string;
  x: string;
  linkedin: string;
  youtube: string;

  // Pricing / claim
  priceRange: string;
  ownerName: string;

  // Terms
  agree: boolean;
};

const DEFAULTS: FormState = {
  businessName: "",
  tagline: "",
  category: "",
  description: "",

  address1: "",
  address2: "",
  city: "",
  state: "IL",
  zip: "",

  phone: "",
  email: "",
  website: "",

  mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "",

  facebook: "",
  instagram: "",
  x: "",
  linkedin: "",
  youtube: "",

  priceRange: "$$",
  ownerName: "",

  agree: false,
};

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle ? <p className="text-sm text-gray-600 mt-1">{subtitle}</p> : null}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold text-gray-800 mb-1">{children}</div>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 " +
        "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 " +
        (props.className || "")
      }
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 " +
        "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 " +
        (props.className || "")
      }
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={
        "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 " +
        "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 " +
        (props.className || "")
      }
    />
  );
}

export default function SubmitListingForm({ plan }: { plan: string }) {
  const [s, setS] = useState<FormState>(DEFAULTS);

  const [logoName, setLogoName] = useState<string>("");
  const [galleryNames, setGalleryNames] = useState<string[]>([]);

  const progress = useMemo(() => {
    const required = [
      s.businessName.trim(),
      s.category.trim(),
      s.description.trim(),
      s.address1.trim(),
      s.city.trim(),
      s.state.trim(),
      s.zip.trim(),
      s.phone.trim(),
      s.email.trim(),
      s.agree ? "yes" : "",
    ];
    const filled = required.filter(Boolean).length;
    return Math.round((filled / required.length) * 100);
  }, [s]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Stub: for now we just show a success message.
    // Later we’ll wire to Directus / n8n.
    alert("Submission received (stub). Next step: wire to backend.");
    console.log("SUBMIT LISTING", { plan, ...s, logoName, galleryNames });
  }

  return (
    <main className="bg-gray-50">
      {/* Header band */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Submit Your Business Listing
              </h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Fill out the details below. Once submitted, we’ll review and publish your listing on SouthSuburbsBest.com.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <div className="text-sm text-blue-900">
                <span className="font-semibold">Selected Plan:</span>{" "}
                <span className="capitalize">{plan || "free"}</span>
              </div>
              <div className="text-xs text-blue-700 mt-1">
                Tip: You can switch plan by visiting <span className="font-mono">/submit-listing?plan=premium</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-800">Completion</span>
              <span className="text-gray-600">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div className="h-2 bg-blue-600" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: long form */}
          <div className="lg:col-span-8">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Business Info */}
              <Card>
                <SectionTitle
                  title="Business Information"
                  subtitle="Tell visitors what you do and what makes you stand out."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Business Name *</Label>
                    <Input
                      value={s.businessName}
                      onChange={(e) => setField("businessName", e.target.value)}
                      placeholder="e.g., Southland HVAC Pros"
                      required
                    />
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Input
                      value={s.tagline}
                      onChange={(e) => setField("tagline", e.target.value)}
                      placeholder="e.g., Fast service • Fair pricing"
                    />
                  </div>

                  <div>
                    <Label>Category *</Label>
                    <Select
                      value={s.category}
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
                      <option value="Cleaning Services">Cleaning Services</option>
                      <option value="Handyman">Handyman</option>
                    </Select>
                  </div>

                  <div>
                    <Label>Price Range</Label>
                    <Select
                      value={s.priceRange}
                      onChange={(e) => setField("priceRange", e.target.value)}
                    >
                      <option value="$">$ (Budget)</option>
                      <option value="$$">$$ (Mid-range)</option>
                      <option value="$$$">$$$ (Premium)</option>
                      <option value="$$$$">$$$$ (Luxury)</option>
                    </Select>
                  </div>
                </div>

                <div className="mt-4">
                  <Label>Description *</Label>
                  <Textarea
                    value={s.description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Write a clear description of your services, service area, and what makes you the best choice."
                    rows={6}
                    required
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    Keep it simple and specific. Mention your main service areas (e.g., Orland Park, Tinley Park, Frankfort).
                  </div>
                </div>
              </Card>

              {/* Location */}
              <Card>
                <SectionTitle
                  title="Location"
                  subtitle="This helps customers find you and helps your listing rank locally."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>Address Line 1 *</Label>
                    <Input
                      value={s.address1}
                      onChange={(e) => setField("address1", e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Address Line 2</Label>
                    <Input
                      value={s.address2}
                      onChange={(e) => setField("address2", e.target.value)}
                      placeholder="Suite, unit, etc. (optional)"
                    />
                  </div>

                  <div>
                    <Label>City *</Label>
                    <Input
                      value={s.city}
                      onChange={(e) => setField("city", e.target.value)}
                      placeholder="e.g., Orland Park"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>State *</Label>
                      <Input
                        value={s.state}
                        onChange={(e) => setField("state", e.target.value)}
                        placeholder="IL"
                        required
                      />
                    </div>
                    <div>
                      <Label>ZIP *</Label>
                      <Input
                        value={s.zip}
                        onChange={(e) => setField("zip", e.target.value)}
                        placeholder="60462"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-6">
                  <Label>Map (preview)</Label>
                  <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 h-48 flex items-center justify-center text-gray-500">
                    Map preview placeholder (we can wire real maps later)
                  </div>
                </div>
              </Card>

              {/* Contact */}
              <Card>
                <SectionTitle
                  title="Contact Details"
                  subtitle="How customers reach you."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Phone *</Label>
                    <Input
                      value={s.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="(708) 555-1234"
                      required
                    />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      value={s.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="you@business.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Website</Label>
                    <Input
                      value={s.website}
                      onChange={(e) => setField("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card>
                <SectionTitle
                  title="Business Hours"
                  subtitle="Optional, but recommended."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Monday</Label><Input value={s.mon} onChange={(e) => setField("mon", e.target.value)} placeholder="9:00 AM - 5:00 PM" /></div>
                  <div><Label>Tuesday</Label><Input value={s.tue} onChange={(e) => setField("tue", e.target.value)} placeholder="9:00 AM - 5:00 PM" /></div>
                  <div><Label>Wednesday</Label><Input value={s.wed} onChange={(e) => setField("wed", e.target.value)} placeholder="9:00 AM - 5:00 PM" /></div>
                  <div><Label>Thursday</Label><Input value={s.thu} onChange={(e) => setField("thu", e.target.value)} placeholder="9:00 AM - 5:00 PM" /></div>
                  <div><Label>Friday</Label><Input value={s.fri} onChange={(e) => setField("fri", e.target.value)} placeholder="9:00 AM - 5:00 PM" /></div>
                  <div><Label>Saturday</Label><Input value={s.sat} onChange={(e) => setField("sat", e.target.value)} placeholder="10:00 AM - 2:00 PM" /></div>
                  <div className="md:col-span-2"><Label>Sunday</Label><Input value={s.sun} onChange={(e) => setField("sun", e.target.value)} placeholder="Closed / By appointment" /></div>
                </div>
              </Card>

              {/* Media */}
              <Card>
                <SectionTitle
                  title="Media"
                  subtitle="Upload a logo and a few photos. (UI only for now — we’ll wire storage later.)"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Business Logo</Label>
                    <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoName(e.target.files?.[0]?.name || "")}
                      />
                      <div className="text-xs text-gray-500 mt-2">
                        {logoName ? `Selected: ${logoName}` : "No file selected"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Gallery Images</Label>
                    <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          setGalleryNames(Array.from(e.target.files || []).map((f) => f.name))
                        }
                      />
                      <div className="text-xs text-gray-500 mt-2">
                        {galleryNames.length ? `${galleryNames.length} file(s) selected` : "No files selected"}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social */}
              <Card>
                <SectionTitle
                  title="Social Links"
                  subtitle="Optional — helps visitors trust the business."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Facebook</Label><Input value={s.facebook} onChange={(e) => setField("facebook", e.target.value)} placeholder="https://facebook.com/..." /></div>
                  <div><Label>Instagram</Label><Input value={s.instagram} onChange={(e) => setField("instagram", e.target.value)} placeholder="https://instagram.com/..." /></div>
                  <div><Label>X (Twitter)</Label><Input value={s.x} onChange={(e) => setField("x", e.target.value)} placeholder="https://x.com/..." /></div>
                  <div><Label>LinkedIn</Label><Input value={s.linkedin} onChange={(e) => setField("linkedin", e.target.value)} placeholder="https://linkedin.com/..." /></div>
                  <div className="md:col-span-2"><Label>YouTube</Label><Input value={s.youtube} onChange={(e) => setField("youtube", e.target.value)} placeholder="https://youtube.com/..." /></div>
                </div>
              </Card>

              {/* Owner / Claim */}
              <Card>
                <SectionTitle
                  title="Owner / Claim Information"
                  subtitle="Who should we contact if we need to verify details?"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>Your Name</Label>
                    <Input
                      value={s.ownerName}
                      onChange={(e) => setField("ownerName", e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={s.agree}
                    onChange={(e) => setField("agree", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="agree" className="text-sm text-gray-700">
                    I confirm the information is accurate and I agree to the submission terms. *
                  </label>
                </div>
              </Card>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="text-sm text-gray-600">
                  Required fields are marked with <span className="font-semibold">*</span>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-sm"
                >
                  Submit Listing
                </button>
              </div>
            </form>
          </div>

          {/* Right: sidebar summary */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Submission Summary</div>
                    <div className="text-lg font-bold text-gray-900 mt-1">
                      {s.businessName.trim() ? s.businessName : "Your Business Name"}
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 capitalize">
                    {plan || "free"}
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-semibold">{s.category || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price Range</span>
                    <span className="font-semibold">{s.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-semibold">
                      {s.city || "—"}{s.state ? `, ${s.state}` : ""}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs text-gray-500 mb-2">Completion</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-blue-600" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-xs text-gray-600 mt-2">{progress}% complete</div>
                </div>

                <div className="mt-6 text-xs text-gray-500">
                  After submission, we’ll review for accuracy and publish your listing.
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <div className="text-sm font-bold text-gray-900">Need help?</div>
                <div className="text-sm text-gray-600 mt-2">
                  If you’re not sure what to enter, just fill the basics and submit. We’ll follow up if anything is missing.
                </div>
                <div className="mt-4 text-sm">
                  <a className="text-blue-700 font-semibold hover:underline" href="/contact">
                    Contact support
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
