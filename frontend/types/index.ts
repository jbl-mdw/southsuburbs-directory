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
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}
