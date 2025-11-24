'use client';

import React from 'react';

interface BusinessMapProps {
  businessName: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  phone?: string | null;
}

export default function BusinessMap({
  businessName,
  address,
  latitude,
  longitude,
  phone,
}: BusinessMapProps) {
  const hasCoords = typeof latitude === 'number' && typeof longitude === 'number';

  const mapsUrl = hasCoords
    ? `https://www.google.com/maps?q=${latitude},${longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`;

  const directionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        address
      )}`;

  const embedUrl = hasCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${
        (longitude as number) - 0.01
      },${(latitude as number) - 0.01},${(longitude as number) + 0.01},${
        (latitude as number) + 0.01
      }&layer=mapnik&marker=${latitude},${longitude}`
    : null;

  return (
    <section id="map" className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-80 bg-gray-100">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            title={`Map showing location of ${businessName}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center p-6">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-600 font-medium mb-1">Map Preview</p>
              <p className="text-xs text-gray-500">
                Click &quot;View on Maps&quot; below to open in Google Maps.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-[220px]">
            <h3 className="font-semibold text-gray-900 mb-1">{businessName}</h3>
            <p className="text-xs text-gray-600 mb-1">{address}</p>
            {phone && (
              <p className="text-xs text-gray-600">
                Phone:{' '}
                <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
                  {phone}
                </a>
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01.057 1.352l-.057.062-4 4a1 1 0 01-1.497-1.32l.083-.094L12.586 11H5a1 1 0 01-.993-.883L4 10a1 1 0 011-1h7.586l-2.293-2.293a1 1 0 010-1.414z"
                />
              </svg>
              Directions
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-300 transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              View on Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

