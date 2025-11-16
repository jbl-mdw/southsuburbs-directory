'use client';

import React from 'react';
import { BusinessHours as BusinessHoursType } from '@/types';

interface BusinessHoursProps {
  hours?: BusinessHoursType;
}

export default function BusinessHours({ hours }: BusinessHoursProps) {
  if (!hours) {
    return null;
  }

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ] as const;

  const currentDay = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase();

  const isOpen = (dayHours: string | undefined) => {
    if (!dayHours || dayHours.toLowerCase() === 'closed') return false;
    // Simple check - could be enhanced with actual time checking
    return true;
  };

  const getCurrentStatus = () => {
    const todayHours = hours[currentDay as keyof BusinessHoursType];
    if (!todayHours || todayHours.toLowerCase() === 'closed') {
      return { text: 'Closed', color: 'text-red-600' };
    }
    // Could enhance this with actual time checking
    return { text: 'Open', color: 'text-green-600' };
  };

  const status = getCurrentStatus();

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Business Hours</h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.color.replace('text', 'bg')}`} />
          <span className={`font-semibold ${status.color}`}>{status.text}</span>
        </div>
      </div>

      <div className="space-y-3">
        {daysOfWeek.map(({ key, label }) => {
          const dayHours = hours[key];
          const isToday = key === currentDay;

          return (
            <div
              key={key}
              className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                isToday ? 'bg-blue-50 border border-blue-200' : ''
              }`}
            >
              <span
                className={`font-medium ${
                  isToday ? 'text-blue-900' : 'text-gray-700'
                }`}
              >
                {label}
                {isToday && (
                  <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </span>
              <span
                className={`${
                  isToday ? 'text-blue-900 font-semibold' : 'text-gray-600'
                }`}
              >
                {dayHours || 'Closed'}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
