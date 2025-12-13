'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type FormData = {
  business_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city_or_zip: string;
  service_requested: string;
  message: string;
  preferred_contact: 'email' | 'phone' | 'either';
  budget_range: 'under_1k' | '1k_5k' | '5k_10k' | '10k_25k' | '25k_plus' | '';
  timeline: 'urgent' | '1_week' | '1_month' | '3_months' | 'flexible' | '';
};

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const businessSlug = searchParams.get('business');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessId, setBusinessId] = useState('');

  const [formData, setFormData] = useState<FormData>({
    business_id: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    city_or_zip: '',
    service_requested: '',
    message: '',
    preferred_contact: 'either',
    budget_range: '',
    timeline: '',
  });

  // Fetch business details if slug is provided
  useEffect(() => {
    async function loadBusiness() {
      if (!businessSlug) return;

      try {
        const url =
          'https://southsuburbsbest.com/directus/items/businesses' +
          '?filter[slug][_eq]=' +
          encodeURIComponent(businessSlug) +
          '&limit=1' +
          '&fields=id,name';

        const res = await fetch(url, {
  method: 'GET',
  next: { revalidate: 300 },
});

        if (res.ok) {
          const data = await res.json();
          const biz = data.data?.[0];
          if (biz) {
            setBusinessName(biz.name);
            setBusinessId(biz.id);
            setFormData((prev) => ({ ...prev, business_id: biz.id }));
          }
        }
      } catch (err) {
        console.error('Failed to load business:', err);
      }
    }

    loadBusiness();
  }, [businessSlug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get client IP address (you may want to use a service for this)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip_address = ipData.ip;

      // Prepare payload with all fields in snake_case
      const payload = {
        business_id: formData.business_id,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        city_or_zip: formData.city_or_zip,
        service_requested: formData.service_requested,
        message: formData.message,
        preferred_contact: formData.preferred_contact,
        budget_range: formData.budget_range || null,
        timeline: formData.timeline || null,
        source: 'website',
        utm_source: searchParams.get('utm_source') || null,
        utm_medium: searchParams.get('utm_medium') || null,
        utm_campaign: searchParams.get('utm_campaign') || null,
        ip_address: ip_address,
      };

      // POST to n8n webhook
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://automation.leads2scale.com/webhook/lead-submission';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-green-900 mb-2">
            ✓ Request Received!
          </h1>
          <p className="text-green-700 text-sm">
            Thank you for your quote request. {businessName ? `${businessName} will` : 'A business owner will'} get back to you soon.
          </p>
          <div className="mt-6">
            <a
              href="/explore"
              className="inline-block text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
            >
              Back to Explore
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Request a Quote</h1>
        {businessName && (
          <p className="text-sm text-gray-600 mt-1">
            For: <span className="font-semibold">{businessName}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Information</h2>

          <div>
            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              required
              value={formData.customer_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="customer_email"
              name="customer_email"
              required
              value={formData.customer_email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="customer_phone"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="(708) 555-1234"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label htmlFor="city_or_zip" className="block text-sm font-medium text-gray-700 mb-1">
              City or ZIP Code
            </label>
            <input
              type="text"
              id="city_or_zip"
              name="city_or_zip"
              value={formData.city_or_zip}
              onChange={handleChange}
              placeholder="e.g., Orland Park or 60462"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>

          <div>
            <label htmlFor="service_requested" className="block text-sm font-medium text-gray-700 mb-1">
              Service Requested
            </label>
            <input
              type="text"
              id="service_requested"
              name="service_requested"
              value={formData.service_requested}
              onChange={handleChange}
              placeholder="e.g., HVAC Repair, Roof Replacement, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Tell us more about your project *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe what you need help with..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
              When do you need this done?
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Select timeline...</option>
              <option value="urgent">Urgent (ASAP)</option>
              <option value="1_week">Within 1 week</option>
              <option value="1_month">Within 1 month</option>
              <option value="3_months">Within 3 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget_range" className="block text-sm font-medium text-gray-700 mb-1">
              Budget Range
            </label>
            <select
              id="budget_range"
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Select budget...</option>
              <option value="under_1k">Under $1,000</option>
              <option value="1k_5k">$1,000 - $5,000</option>
              <option value="5k_10k">$5,000 - $10,000</option>
              <option value="10k_25k">$10,000 - $25,000</option>
              <option value="25k_plus">$25,000+</option>
            </select>
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Contact Preference</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you like to be contacted?
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferred_contact"
                  value="email"
                  checked={formData.preferred_contact === 'email'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferred_contact"
                  value="phone"
                  checked={formData.preferred_contact === 'phone'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Phone</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferred_contact"
                  value="either"
                  checked={formData.preferred_contact === 'either'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Either is fine</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-lg px-6 py-3"
          >
            {loading ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to be contacted about your project.
        </p>
      </form>
    </main>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <main className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-gray-500 text-sm">Loading...</p>
      </main>
    }>
      <QuoteFormContent />
    </Suspense>
  );
}
