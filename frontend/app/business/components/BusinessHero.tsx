'use client';
import React from 'react';
interface BusinessHeroProps { 
  name: string; 
  tagline?: string; 
  heroType?: string;
  heroColor?: string;
  coverImage?: string;
  gallery?: string[];
  heroVideoUrl?: string;
  rating?: number; 
  reviewCount?: number;
  isFeatured?: boolean;
  categories?: any[];
}
 export default function BusinessHero({ name, tagline, heroType, heroColor, coverImage, gallery, heroVideoUrl, rating = 0, reviewCount = 0, isFeatured, categories }: BusinessHeroProps) {
  return (
    <div className="relative h-96 bg-blue-600">
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <h1 className="text-4xl font-bold text-white mb-3">{name}</h1>
          {tagline && <p className="text-xl text-white/90">{tagline}</p>}
        </div>
      </div>
    </div>
  );
}
