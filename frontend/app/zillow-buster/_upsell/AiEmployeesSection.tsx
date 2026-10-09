// AI Employees upsell - removed from the directory sales page by founder
// direction and preserved here, self-contained, for the separate
// customer upsell journey. The `_upsell` folder is private to the Next.js
// app router (never routed), so nothing here renders until a future page
// imports it. Pricing stays founder-approved only (null = "request
// pricing"); availability per customer is confirmed before selling.

import Link from "next/link";
import { Bot } from "lucide-react";

export type AiEmployee = { name: string; body: string; price: string | null };

export const AI_EMPLOYEES: AiEmployee[] = [
  {
    name: "AI Receptionist",
    body: "Answers buyer and seller questions day and night and captures their contact details, so an after-hours inquiry doesn't go unanswered.",
    price: null,
  },
  {
    name: "AI Prospector",
    body: "Helps you identify and reach new sellers, buyers and referral partners in your market.",
    price: null,
  },
  {
    name: "AI Executive Assistant",
    body: "Takes routine follow-up, scheduling coordination and admin off your plate so you can stay in front of clients.",
    price: null,
  },
];

export default function AiEmployeesSection({
  employees = AI_EMPLOYEES,
  ctaHref = "#get-started",
  eyebrow = "Add-ons",
  title = "Respond faster. Follow up every time.",
  body = "Add AI Employees to your directory. They're separate from your directory subscription, and we'll confirm which fit your business before you add them.",
}: {
  employees?: AiEmployee[];
  ctaHref?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-slate-600">{body}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {employees.map((u) => (
            <div key={u.name} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">
                  <Bot className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">Add-on</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{u.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{u.body}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className={u.price ? "text-2xl font-bold text-slate-900" : "text-sm font-semibold text-slate-500"}>
                  {u.price || "Request pricing"}
                </span>
                <Link href={ctaHref} className="text-sm font-bold text-[#1e3a5f] hover:underline">
                  Ask about it →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
