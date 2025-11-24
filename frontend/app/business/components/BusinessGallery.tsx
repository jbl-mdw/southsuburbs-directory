'use client';

import React, { useState } from 'react';

interface BusinessGalleryProps {
  images: string[];
  businessName: string;
}

export default function BusinessGallery({
  images,
  businessName,
}: BusinessGalleryProps) {
  // Clean up any empty / null values
  const normalizedImages = (images || []).filter(Boolean);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!normalizedImages.length) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex - 1 + normalizedImages.length) % normalizedImages.length
    );
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % normalizedImages.length);
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6" id="gallery">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
          <p className="text-gray-600 text-sm">
            A look inside {businessName}.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7a2 2 0 012-2h2l1-2h6l1 2h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 12l2 2 4-4"
            />
          </svg>
          {normalizedImages.length} {normalizedImages.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {normalizedImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => openLightbox(idx)}
            className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <img
              src={img}
              alt={`${businessName} photo ${idx + 1}`}
              className="w-full h-32 sm:h-36 md:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition" />

            {/* Zoom icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox / full-screen viewer */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-3 right-3 text-white hover:text-gray-200 transition"
              aria-label="Close gallery"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Main image */}
            <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center max-h-[70vh]">
              <img
                src={normalizedImages[selectedIndex]}
                alt={`${businessName} photo ${selectedIndex + 1}`}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Caption + controls */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-200">
              <div>
                <p className="font-semibold">{businessName}</p>
                <p className="text-gray-400">
                  Photo {selectedIndex + 1} of {normalizedImages.length}
                </p>
              </div>

              {normalizedImages.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrev}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition"
                  >
                    Next
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

