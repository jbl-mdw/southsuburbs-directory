"use client";

// REAL-ESTATE-DIRECTORY-PROPERTY-FOUNDATION-001 - a real showing/inquiry
// request, reusing the exact same canonical, generic public lead path
// (/v1/public/directory-lead) every other SSB conversion action already
// uses (see frontend/app/quote/page.tsx, submit-listing/submit-form.tsx)
// - never a second lead endpoint. workflowKey "booking.request" is a
// real, pre-existing canonical workflow key (never invented here); the
// resolved lead-destination (the real listing agent, or the real
// directory owner as fallback) is computed server-side by the gateway
// and passed in as props - this form never re-derives or guesses it.
// Never claims a showing is booked: no calendar integration backs this
// path, so the confirmation copy only ever promises real human follow-up.

import { useState } from "react";

type LeadDestination = { type: "agent" | "directory_owner" | "platform_default"; name?: string; email?: string; clientId?: string };

export default function ShowingInquiryForm({
  scopeId,
  entityId,
  propertyAddress,
  leadDestination,
}: {
  scopeId: string;
  entityId: string;
  propertyAddress: string;
  leadDestination: LeadDestination;
}) {
  const [requestType, setRequestType] = useState<"showing" | "inquiry">("showing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const contactName = leadDestination.type === "agent" ? leadDestination.name : "South Suburbs Best";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("https://automation.leads2scale.com/v1/public/directory-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: "SSB_PROD",
          tenantId: scopeId,
          workflowKey: requestType === "showing" ? "booking.request" : "listing.inquiry",
          source: "real_estate_property_detail",
          contact: { name, email, phone },
          message: message || `${requestType === "showing" ? "Showing request" : "Inquiry"} for ${propertyAddress}`,
          metadata: {
            entityId,
            scopeId,
            propertyAddress,
            leadDestinationType: leadDestination.type,
            leadDestinationEmail: leadDestination.email || null,
            leadDestinationClientId: leadDestination.clientId || null,
          },
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-xl bg-emerald-50 p-5 text-sm text-emerald-800">
        Request sent — {contactName} will reach out to confirm{requestType === "showing" ? " a showing time" : ""}. No showing is booked yet; this is a real request for a real human follow-up.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-xl bg-slate-50 p-5">
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setRequestType("showing")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold ${requestType === "showing" ? "bg-[#1e3a5f] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}
        >
          Request a Showing
        </button>
        <button
          type="button"
          onClick={() => setRequestType("inquiry")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold ${requestType === "inquiry" ? "bg-[#1e3a5f] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}
        >
          Ask a Question
        </button>
      </div>
      <p className="mb-3 text-xs text-slate-500">
        For Sale By Owner — connects you with {contactName}. Never an automatically confirmed showing.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message (optional)" rows={3} className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#1e3a5f] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : requestType === "showing" ? "Request Showing" : "Send Question"}
      </button>
      {status === "error" && <p className="mt-2 text-xs text-red-600">Something went wrong — please try again.</p>}
    </form>
  );
}
