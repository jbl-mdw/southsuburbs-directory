'use client';

import React from 'react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface BusinessReviewsProps {
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
  businessName: string;
}

export default function BusinessReviews({
  averageRating = 0,
  totalReviews = 0,
  reviews = [],
  businessName,
}: BusinessReviewsProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === full && half) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Customer Reviews & Ratings
      </h2>

      {/* Summary */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </span>
          <div>
            <div className="flex items-center gap-1">{renderStars(averageRating)}</div>
            <p className="text-sm text-gray-500">
              Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      {(!reviews || reviews.length === 0) && (
        <div className="text-gray-500 text-sm">
          No reviews yet. Be the first to review {businessName}.
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-900">{r.author}</h3>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {renderStars(r.rating)}
              <span className="text-xs text-gray-500">{r.rating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-700">{r.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
