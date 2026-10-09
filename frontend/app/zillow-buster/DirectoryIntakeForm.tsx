"use client";

// ZILLOW-BUSTER-SALES-LANDING-001 - the sales page's conversion form.
//
// It reuses the same canonical public lead path every other SSB
// conversion action uses (/v1/public/directory-lead, see
// real-estate/ShowingInquiryForm.tsx) - never a second endpoint. No
// workflow key for Zillow Buster sales intake has been approved yet, so
// live submission stays OFF until NEXT_PUBLIC_ZB_INTAKE_WORKFLOW_KEY is
// set to a founder-approved key at build time. Until then the form
// never calls the network: it hands the prospect a pre-filled email to
// the existing published sales inbox instead, so the page still
// converts without creating live intake records.

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONFIGURATIONS, SALES_CONTACT, type ConfigKey } from "./content";

const LEAD_ENDPOINT = "https://automation.leads2scale.com/v1/public/directory-lead";
const INTAKE_WORKFLOW_KEY = process.env.NEXT_PUBLIC_ZB_INTAKE_WORKFLOW_KEY || "";

const ADD_ONS = ["AI Receptionist", "AI Prospector", "AI Executive Assistant", "Featured marketplace placement"];

function isConfigKey(value: string | null): value is ConfigKey {
  return CONFIGURATIONS.some((c) => c.key === value);
}

export default function DirectoryIntakeForm() {
  // Buyer-specific CTAs link to ?directory=<key>#get-started so the form
  // opens with the configuration the prospect was just reading about.
  const searchParams = useSearchParams();
  const requested = searchParams.get("directory");
  const [configuration, setConfiguration] = useState<ConfigKey>(isConfigKey(requested) ? requested : "solo-agent");

  useEffect(() => {
    if (isConfigKey(requested)) setConfiguration(requested);
  }, [requested]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [domainStatus, setDomainStatus] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "preview">("idle");

  const configName = CONFIGURATIONS.find((c) => c.key === configuration)?.name || configuration;
  const teamSizeLabel =
    configuration === "brokerage" ? "Number of agents" : configuration === "builder" ? "Number of communities" : null;

  function toggleAddOn(addOn: string) {
    setAddOns((prev) => (prev.includes(addOn) ? prev.filter((a) => a !== addOn) : [...prev, addOn]));
  }

  function summary(): string {
    return [
      `Configuration: ${configName}`,
      `Name: ${name}`,
      company && `Business: ${company}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      serviceArea && `Service area: ${serviceArea}`,
      teamSizeLabel && teamSize && `${teamSizeLabel}: ${teamSize}`,
      domainStatus && `Domain: ${domainStatus}`,
      addOns.length > 0 && `Interested in: ${addOns.join(", ")}`,
      message && `Notes: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (!INTAKE_WORKFLOW_KEY) {
      setStatus("preview");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: "SSB_PROD",
          tenantId: "SSB",
          workflowKey: INTAKE_WORKFLOW_KEY,
          source: "zillow_buster_sales_page",
          contact: { name, email, phone },
          message: summary(),
          metadata: { configuration, company, serviceArea, teamSize, domainStatus, addOns },
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-emerald-50 p-8 text-emerald-900">
        <p className="text-lg font-bold">Thanks, {name.split(" ")[0]}. Your request is in.</p>
        <p className="mt-2 text-sm">
          We&apos;ll reach out to walk through your {configName} and next steps. Questions in the meantime? Call{" "}
          <a href={SALES_CONTACT.phoneHref} className="font-semibold underline">
            {SALES_CONTACT.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  if (status === "preview") {
    const mailto = `mailto:${SALES_CONTACT.email}?subject=${encodeURIComponent(
      `Zillow Buster: ${configName}`
    )}&body=${encodeURIComponent(summary())}`;
    return (
      <div className="rounded-2xl bg-white p-8 text-slate-800 ring-1 ring-slate-200">
        <p className="text-lg font-bold text-slate-900">One more step to send your request</p>
        <p className="mt-2 text-sm text-slate-600">
          We&apos;ve put your details into an email for you. Send it and we&apos;ll get back to you about your {configName}.
        </p>
        <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs text-slate-700">{summary()}</pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="inline-flex items-center justify-center rounded-full bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#16304d]"
          >
            Send my request by email
          </a>
          <a
            href={SALES_CONTACT.phoneHref}
            className="inline-flex items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Or call {SALES_CONTACT.phone}
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-semibold text-slate-500 underline-offset-2 hover:underline"
          >
            Edit details
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 text-slate-800 shadow-2xl sm:p-8">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Which directory are you interested in?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONFIGURATIONS.map((c) => (
            <label
              key={c.key}
              className={`cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold ring-1 transition ${
                configuration === c.key
                  ? "bg-[#1e3a5f] text-white ring-[#1e3a5f]"
                  : "bg-slate-50 text-slate-700 ring-slate-200 hover:ring-slate-300"
              }`}
            >
              <input
                type="radio"
                name="configuration"
                value={c.key}
                checked={configuration === c.key}
                onChange={() => setConfiguration(c.key)}
                className="sr-only"
              />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className={inputClass} />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Business or brokerage name" aria-label="Business or brokerage name" className={inputClass} />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" className={inputClass} />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" aria-label="Phone" className={inputClass} />
        <input value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} placeholder="Cities or areas you serve" aria-label="Cities or areas you serve" className={inputClass} />
        <select value={domainStatus} onChange={(e) => setDomainStatus(e.target.value)} aria-label="Domain" className={inputClass}>
          <option value="">Do you have a domain?</option>
          <option value="I already own a domain">I already own a domain</option>
          <option value="I need help choosing a domain">I need help choosing one</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
        {teamSizeLabel && (
          <input
            type="number"
            min="1"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder={teamSizeLabel}
            aria-label={teamSizeLabel}
            className={`${inputClass} sm:col-span-2`}
          />
        )}
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Interested in growth upgrades? (optional)
        </legend>
        <div className="flex flex-wrap gap-2">
          {ADD_ONS.map((addOn) => (
            <button
              key={addOn}
              type="button"
              onClick={() => toggleAddOn(addOn)}
              aria-pressed={addOns.includes(addOn)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition ${
                addOns.includes(addOn)
                  ? "bg-amber-100 text-amber-900 ring-amber-300"
                  : "bg-white text-slate-600 ring-slate-200 hover:ring-slate-300"
              }`}
            >
              {addOn}
            </button>
          ))}
        </div>
      </fieldset>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Anything we should know? (optional)"
        aria-label="Notes"
        rows={3}
        className={`${inputClass} mt-5`}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 text-base font-bold text-slate-900 shadow-lg transition hover:bg-amber-300 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Request my directory walkthrough"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">
          Something went wrong. Please call {SALES_CONTACT.phone} or email {SALES_CONTACT.email}.
        </p>
      )}
      <p className="mt-3 text-center text-xs text-slate-400">No payment required. We&apos;ll confirm fit before anything is built.</p>
    </form>
  );
}
