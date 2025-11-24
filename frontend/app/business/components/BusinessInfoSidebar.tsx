'use client';

import React from 'react';
import { Business } from '@/types';

interface BusinessInfoSidebarProps {
  business: Business;
}

export default function BusinessInfoSidebar({ business }: BusinessInfoSidebarProps) {
  const fullAddress = [
    business.address_line1,
    business.address_line2,
    `${business.city}, ${business.state} ${business.zipcode}`,
  ]
    .filter(Boolean)
    .join(', ');

  const websiteUrl =
    business.website && business.website.startsWith('http')
      ? business.website
      : business.website
      ? `https://${business.website}`
      : undefined;

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Business</h3>

        <div className="space-y-3">
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>
          )}

          <a
            href="#contact-form"
            className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Send Message
          </a>

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg border-2 border-gray-300 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                />
              </svg>
              Visit Website
            </a>
          )}

          <a
            href="#map"
            className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg border-2 border-gray-300 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            Get Directions
          </a>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Business Information</h3>

        <div className="space-y-4">
          {/* Address */}
          <div>
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-900">Address</p>
                <p className="text-sm text-gray-600 mt-1">{fullAddress}</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          {business.phone && (
            <div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Phone</p>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-sm text-blue-600 hover:underline mt-1 block"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Email */}
          {business.email && (
            <div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm text-blue-600 hover:underline mt-1 block break-all"
                  >
                    {business.email}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Website */}
          {websiteUrl && (
            <div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Website</p>
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 block break-all"
                  >
                    {business.website}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Price range */}
          {business.price_range && (
            <div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 4a1 1 0 10-2 0v.252a3.49 3.49 0 00-1.481.63C7.057 7.36 6.5 8.11 6.5 9c0 .89.557 1.64 1.019 2.118.463.48 1.02.83 1.481 1.004V13a1 1 0 102 0v-.252a3.49 3.49 0 001.481-.63C12.943 11.64 13.5 10.89 13.5 10c0-.89-.557-1.64-1.019-2.118A3.49 3.49 0 0011 7.748V7zm-1 2c.39 0 .735.152.981.382.245.23.519.588.519 1.118 0 .53-.274.888-.519 1.118A1.49 1.49 0 0110 12a1.49 1.49 0 01-.981-.382C8.774 11.388 8.5 11.03 8.5 10.5c0-.53.274-.888.519-1.118A1.49 1.49 0 0110 9z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Price Range</p>
                  <p className="text-sm text-gray-600 mt-1">{business.price_range}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
