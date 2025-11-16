'use client';

import React, { useState } from 'react';

interface VideoItem {
  url: string;
  title?: string;
  description?: string;
}

interface BusinessVideosProps {
  videos: VideoItem[] | string[];
  businessName: string;
}

export default function BusinessVideos({ videos, businessName }: BusinessVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  // Normalize videos to VideoItem format
  const normalizedVideos: VideoItem[] = videos.map((video) => {
    if (typeof video === 'string') {
      return { url: video };
    }
    return video;
  });

  // Helper function to detect video type
  const getVideoType = (url: string) => {
    if (!url) return null;

    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      return 'youtube';
    }

    if (url.includes('vimeo.com/')) {
      return 'vimeo';
    }

    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return 'direct';
    }

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

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  // Get Vimeo thumbnail (this requires an API call, so we'll use a placeholder)
  const getVimeoThumbnail = () => {
    return 'https://via.placeholder.com/480x360?text=Vimeo+Video';
  };

  const renderVideoThumbnail = (video: VideoItem, index: number) => {
    const videoType = getVideoType(video.url);
    let thumbnail = null;

    if (videoType === 'youtube') {
      thumbnail = getYouTubeThumbnail(video.url);
    } else if (videoType === 'vimeo') {
      thumbnail = getVimeoThumbnail();
    }

    return (
      <button
        key={index}
        onClick={() => setSelectedVideo(index)}
        className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer bg-gray-900"
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title || `${businessName} video ${index + 1}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white/50"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-900 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>

        {/* Video info */}
        {video.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-white font-semibold text-sm line-clamp-2">
              {video.title}
            </p>
          </div>
        )}
      </button>
    );
  };

  const renderVideoPlayer = (video: VideoItem) => {
    const videoType = getVideoType(video.url);

    if (videoType === 'youtube') {
      const videoId = getYouTubeId(video.url);
      if (videoId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="w-full aspect-video rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title || 'Video'}
          />
        );
      }
    }

    if (videoType === 'vimeo') {
      const videoId = getVimeoId(video.url);
      if (videoId) {
        return (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
            className="w-full aspect-video rounded-lg"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title || 'Video'}
          />
        );
      }
    }

    // Self-hosted video
    return (
      <video
        controls
        autoPlay
        className="w-full aspect-video rounded-lg bg-black"
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Videos</h2>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {normalizedVideos.map((video, index) => renderVideoThumbnail(video, index))}
      </div>

      {/* Video Modal/Lightbox */}
      {selectedVideo !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-between items-start mb-4">
              <div className="text-white">
                {normalizedVideos[selectedVideo].title && (
                  <h3 className="text-2xl font-bold mb-2">
                    {normalizedVideos[selectedVideo].title}
                  </h3>
                )}
                {normalizedVideos[selectedVideo].description && (
                  <p className="text-gray-300">
                    {normalizedVideos[selectedVideo].description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-white hover:text-gray-300 transition ml-4"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Video Player */}
            {renderVideoPlayer(normalizedVideos[selectedVideo])}

            {/* Navigation */}
            {normalizedVideos.length > 1 && (
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() =>
                    setSelectedVideo(
                      (selectedVideo - 1 + normalizedVideos.length) % normalizedVideos.length
                    )
                  }
                  className="text-white hover:text-gray-300 transition flex items-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                <span className="text-white">
                  {selectedVideo + 1} / {normalizedVideos.length}
                </span>

                <button
                  onClick={() =>
                    setSelectedVideo((selectedVideo + 1) % normalizedVideos.length)
                  }
                  className="text-white hover:text-gray-300 transition flex items-center gap-2"
                >
                  Next
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      )}
    </section>
  );
}
