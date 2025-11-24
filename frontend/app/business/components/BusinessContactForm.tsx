'use client';

import React, { useState } from 'react';

interface BusinessContactFormProps {
  businessName: string;
  businessEmail?: string | null;
}

export default function BusinessContactForm({
  businessName,
  businessEmail,
}: BusinessContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // For now, just log. Later we can wire this to n8n / Directus.
      console.log('Contact form submitted:', {
        businessName,
        businessEmail,
        ...formData,
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      console.error('Contact form error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="bg-white rounded-xl shadow-lg p-6 border border-blue-50"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Contact {businessName}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Send a message and someone from {businessName} will follow up with you.
      </p>

      {submitted && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          Your message has been sent. Thank you!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Your Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Phone (optional)
          </label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us what you need help with..."
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold transition"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          {businessEmail && (
            <p className="text-xs text-gray-500">
              Or email directly:{' '}
              <a
                href={`mailto:${businessEmail}`}
                className="text-blue-600 hover:underline break-all"
              >
                {businessEmail}
              </a>
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
