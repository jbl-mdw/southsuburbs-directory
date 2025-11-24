'use client';

import React from 'react';

type AnyHours = any;

interface BusinessHoursProps {
  hours: AnyHours;
}

interface NormalizedHourRow {
  day: string;
  open: string | null;
  close: string | null;
  closed: boolean;
}

const DAY_ORDER = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function normalizeHours(hours: AnyHours): NormalizedHourRow[] {
  if (!hours) return [];

  // If already array-like
  if (Array.isArray(hours)) {
    return hours.map((row: any) => {
      const day = row.day || row.Day || 'Day';
      const open = row.open ?? row.open_time ?? row.start ?? null;
      const close = row.close ?? row.close_time ?? row.end ?? null;
      const closed =
        row.closed === true ||
        row.isClosed === true ||
        (!open && !close);

      return {
        day,
        open: open || null,
        close: close || null,
        closed,
      };
    });
  }

  // If object keyed by day
  if (typeof hours === 'object') {
    return Object.keys(hours).map((key) => {
      const row = hours[key];
      const open = row?.open ?? row?.open_time ?? row?.start ?? null;
      const close = row?.close ?? row?.close_time ?? row?.end ?? null;
      const closed =
        row?.closed === true || row?.isClosed === true || (!open && !close);

      return {
        day: key,
        open: open || null,
        close: close || null,
        closed,
      };
    });
  }

  return [];
}

export default function BusinessHours({ hours }: BusinessHoursProps) {
  const rows = normalizeHours(hours);

  if (!rows.length) {
    return null;
  }

  const sorted = rows.sort((a, b) => {
    const aIdx = DAY_ORDER.indexOf(a.day);
    const bIdx = DAY_ORDER.indexOf(b.day);
    if (aIdx === -1 || bIdx === -1) return 0;
    return aIdx - bIdx;
  });

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h2>

      <div className="space-y-2">
        {sorted.map((row) => (
          <div
            key={row.day}
            className="flex items-center justify-between text-sm text-gray-800"
          >
            <span className="font-medium w-32">{row.day}</span>
            {row.closed ? (
              <span className="text-red-500 font-semibold">Closed</span>
            ) : (
              <span className="font-mono">
                {row.open} – {row.close}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

