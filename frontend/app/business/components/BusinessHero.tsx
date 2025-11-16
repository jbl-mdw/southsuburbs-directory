'use client';

import React, { useState } from 'react';

interface BusinessHeroProps {
  name: string;
  tagline?: string;
  heroType?: 'color' | 'image' | 'slideshow' | 'video';
  heroColor?: string;
  coverImage?: string;
  gallery?: string[];
  heroVideoUrl?: string;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  categories?: string[];
}

export default function BusinessHero({
  name,
  tagline,
  heroType = 'color',
  heroColor = '#2563eb',
  coverImage,
  gallery = [],
  heroVideoUrl,
  rating = 0,
  reviewCount = 0,
  isFeatured = false,
  categories = [],
}: BusinessHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowImages = gallery.length > 0 ? gallery : coverImage ? [coverImage] : [];

  // Auto-advance slideshow
  React.useEffect(() => {
    if (heroType === 'slideshow' && slideshowImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroType, slideshowImages.length]);

  // Helper function to detect video type
  const getVideoType = (url: string) => {
    if (!url) return null;

    // YouTube patterns
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      return 'youtube';
    }

    // Vimeo patterns
    if (url.includes('vimeo.com/')) {
      return 'vimeo';
    }

    // Direct video file patterns
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return 'direct';
    }

    // Default to direct if it's a full URL
    if (url.startsWith('http')) {
      return 'direct';
    }

    return null;
  };

  // Helper to extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Helper to extract Vimeo video ID
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const renderHeroBackground = () => {
    switch (heroType) {
      case 'video':
        if (heroVideoUrl) {
          const videoType = getVideoType(heroVideoUrl);

          // YouTube video
          if (videoType === 'youtube') {
            const videoId = getYouTubeId(heroVideoUrl);
            if (videoId) {
              return (
                <div className="absolute inset-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                    className="w-full h-full"
                    style={{
                      border: 0,
                      pointerEvents: 'none',
                      transform: 'scale(1.5)', // Zoom to hide YouTube branding
                    }}
                    allow="autoplay; encrypted-media"
                    title="Hero video"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              );
            }
          }

          // Vimeo video
          if (videoType === 'vimeo') {
            const videoId = getVimeoId(heroVideoUrl);
            if (videoId) {
              return (
                <div className="absolute inset-0">
                  <iframe
                    src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1&controls=0`}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allow="autoplay; fullscreen"
                    title="Hero video"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              );
            }
          }

          // Self-hosted or direct video file
          return (
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={heroVideoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40" />
            </div>
          );
        }
        // Fallback to color if no video
        return (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: heroColor }}
          />
        );

      case 'slideshow':
        if (slideshowImages.length > 0) {
          return (
            <div className="absolute inset-0">
              {slideshowImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-black/40" />
              {/* Slideshow indicators */}
              {slideshowImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {slideshowImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        }
        // Fallback to color if no images
        return (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: heroColor }}
          />
        );

      case 'image':
        if (coverImage) {
          return (
            <div className="absolute inset-0">
              <img
                src={coverImage}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          );
        }
        // Fallback to color if no image
        return (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: heroColor }}
          />
        );

      case 'color':
      default:
        return (
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"
            style={{
              background: `linear-gradient(135deg, ${heroColor}, ${heroColor}dd)`,
            }}
          />
        );
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300 fill-current"
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
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      {renderHeroBackground()}

      {/* Content overlay */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {isFeatured && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Featured Business
                </span>
              )}
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Business name */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {name}
            </h1>

            {/* Tagline */}
            {tagline && (
              <p className="text-xl text-white/90 mb-4 drop-shadow">
                {tagline}
              </p>
            )}

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 inline-flex">
                <div className="flex items-center gap-1">{renderStars()}</div>
                <span className="text-white font-semibold">
                  {rating.toFixed(1)}
                </span>
                <span className="text-white/80 text-sm">
                  ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
