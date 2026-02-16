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
  latitude?: string;
  longitude?: string;
  rating_average: string;
  review_count: number;
  is_featured: boolean;
  categories: any[];
  tagline?: string;
  hero_type?: string;
  hero_color?: string;
  cover_image?: string;
  gallery?: string[];
  hero_video_url?: string;
  services?: string[];
  services_text?: string;
  amenities?: string[];
  payment_methods?: string[];
  languages?: string[];
  hours?: any;
}export interface Business {
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
  latitude?: string;
  longitude?: string;
  rating_average: string;
  review_count: number;
  is_featured: boolean;
  categories: any[];
  tagline?: string;
  hero_type?: string;
  hero_color?: string;
  cover_image?: string;
  gallery?: string[];
  hero_video_url?: string;
  services?: string[];
  services_text?: string;
  amenities?: string[];
  payment_methods?: string[];
  languages?: string[];
  hours?: any;
  price_range?: string;

}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}
