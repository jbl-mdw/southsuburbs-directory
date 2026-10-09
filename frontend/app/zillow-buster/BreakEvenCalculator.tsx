"use client";

// ZILLOW-BUSTER-SALES-LANDING-001 - the "one closing" ROI argument,
// done honestly: pure arithmetic on the prospect's OWN average
// commission. No market statistics, no promised lead volume, no price
// (none is approved yet). The prefilled value is labeled illustrative.

import { useState } from "react";

const ILLUSTRATIVE_COMMISSION = 9000;

function money(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

export default function BreakEvenCalculator() {
  const [commission, setCommission] = useState(String(ILLUSTRATIVE_COMMISSION));
  const [closings, setClosings] = useState("1");

  const c = Math.max(0, Number(commission) || 0);
  const n = Math.max(0, Number(closings) || 0);
  const yearly = c * n;
  const monthly = yearly / 12;
  const isIllustrative = Number(commission) === ILLUSTRATIVE_COMMISSION;

  return (
    <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8 lg:grid-cols-2 lg:items-center">
      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Your average commission per closing</span>
          <div className="mt-2 flex items-center rounded-xl border border-slate-200 px-4 focus-within:ring-2 focus-within:ring-[#1e3a5f]/30">
            <span className="text-lg font-semibold text-slate-400">$</span>
            <input
              type="number"
              min="0"
              step="500"
              inputMode="numeric"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="w-full border-0 bg-transparent px-2 py-3 text-lg font-semibold text-slate-900 focus:outline-none"
            />
          </div>
          {isIllustrative && <span className="mt-1 block text-xs text-slate-400">Illustrative figure. Enter your own.</span>}
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Extra closings per year from your directory</span>
          <select
            value={closings}
            onChange={(e) => setClosings(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
          >
            {[1, 2, 3, 4, 5].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-[#0f2238] to-[#1e3a5f] p-6 text-white">
        <p className="text-sm text-white/70">
          {n === 1 ? "One extra closing a year" : `${n} extra closings a year`} is worth
        </p>
        <p className="mt-1 text-4xl font-bold text-amber-300">{money(yearly)}</p>
        <p className="mt-3 text-sm text-white/80">
          That&apos;s <span className="font-bold text-white">{money(monthly)} a month</span> of value from a single channel
          you own.
        </p>
        <p className="mt-4 text-xs text-white/50">
          Simple math on the numbers you enter. Results vary; we don&apos;t promise a number of leads or closings.
        </p>
      </div>
    </div>
  );
}
