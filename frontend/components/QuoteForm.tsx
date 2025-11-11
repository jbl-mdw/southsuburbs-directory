"use client";
import React, { useState } from "react";

type Props = {
  defaultCityOrZip: string;
  defaultSource: string;
};

export function QuoteForm({ defaultCityOrZip, defaultSource }: Props) {
  const [customer_name, setName] = useState("");
  const [customer_phone, setPhone] = useState("");
  const [customer_email, setEmail] = useState("");
  const [service_requested, setServiceRequested] = useState("");
  const [timeline, setTimeline] = useState("urgent");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      customer_name,
      customer_phone,
      customer_email,
      service_requested,
      timeline,
      message,
      city_or_zip: defaultCityOrZip,
      source: defaultSource,
      preferred_contact: "call",
    };

    const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || "";

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }

    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="bg-white text-gray-800 rounded-xl shadow p-6">
        <div className="text-lg font-semibold mb-2">Request received ✅</div>
        <div className="text-sm text-gray-600">
          We’ll connect you with a trusted local pro shortly.
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-left rounded-xl shadow p-6 text-gray-800 max-w-lg mx-auto"
    >
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Your Name
        </label>
        <input
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={customer_name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jane Doe"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Phone
        </label>
        <input
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={customer_phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="708-555-1212"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={customer_email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          What do you need?
        </label>
        <input
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={service_requested}
          onChange={(e) => setServiceRequested(e.target.value)}
          required
          placeholder="Furnace repair, AC install, water leak..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Timeline
        </label>
        <select
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        >
          <option value="urgent">Urgent / No heat</option>
          <option value="1_week">Within a week</option>
          <option value="2_weeks">Within 2 weeks</option>
          <option value="flexible">Flexible / Just pricing</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Anything we should know?
        </label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Example: 'No heat since last night, 2 small kids in the house.'"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3 text-sm disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Request Help"}
      </button>

      <div className="hidden">
        city_or_zip: {defaultCityOrZip} | source: {defaultSource}
      </div>
    </form>
  );
}
