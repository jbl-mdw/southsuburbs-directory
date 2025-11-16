export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  phone: string;
  email: string;
  website: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zipcode: string;
  rating_average: string;
  review_count: number;
  is_featured: boolean;
  categories: any[];
  // Extended fields for business details page
  logo?: string;
  cover_image?: string;
  gallery?: string[];
  hero_type?: 'color' | 'image' | 'slideshow' | 'video';
  hero_color?: string;
  hero_video_url?: string;
  videos?: VideoItem[] | string[];
  hours?: BusinessHours;
  amenities?: string[];
  services?: string[];
  social_media?: SocialMedia;
  latitude?: number;
  longitude?: number;
  year_established?: number;
  tagline?: string;
  price_range?: string;
  payment_methods?: string[];
  languages?: string[];
}

export interface VideoItem {
  url: string;
  title?: string;
  description?: string;
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}
