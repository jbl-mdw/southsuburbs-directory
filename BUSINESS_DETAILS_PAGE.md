# Business Details Page

## Overview

A comprehensive business details page inspired by ListingPro WordPress theme, designed to showcase local businesses in any niche. The page is fully responsive and flexible, supporting multiple hero styles, galleries, reviews, and more.

## Features

### 1. Flexible Hero Section
The hero section supports multiple display modes:
- **Color Background**: Solid color or gradient background
- **Image Background**: Single cover image with overlay
- **Slideshow**: Automatic slideshow from gallery images
- **Video Background**: Background video with overlay (supports YouTube, Vimeo, and self-hosted)

**Supported Video Sources:**
- **YouTube**: Paste any YouTube URL (watch, share, embed)
- **Vimeo**: Paste any Vimeo URL
- **Self-hosted**: Direct link to .mp4, .webm, or .ogg files

**Fields in Directus:**
- `hero_type`: `'color' | 'image' | 'slideshow' | 'video'`
- `hero_color`: Hex color code (e.g., `#2563eb`)
- `cover_image`: URL to cover image
- `hero_video_url`: URL to video (YouTube, Vimeo, or self-hosted file)
- `gallery`: Array of image URLs

### 2. Business Information Sidebar
Sticky sidebar with quick contact options and business details:
- Call Now button
- Send Message button
- Visit Website button
- Get Directions button
- Full contact information
- Social media links
- Price range
- Year established
- Share functionality

### 3. Photo Gallery
- Grid layout with lightbox viewer
- Click to view full-size images
- Navigation arrows
- Image counter
- Responsive design

### 4. Video Gallery
- Showcase multiple videos (YouTube, Vimeo, self-hosted)
- Automatic thumbnail generation for YouTube videos
- Click to play in modal/lightbox
- Navigation between videos
- Optional title and description per video
- Supports simple URL array or detailed video objects

**Supported Formats:**
```typescript
// Simple array of URLs
videos: [
  "https://www.youtube.com/watch?v=VIDEO_ID",
  "https://vimeo.com/VIDEO_ID",
  "https://example.com/video.mp4"
]

// Or detailed objects with metadata
videos: [
  {
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    title: "Business Tour",
    description: "Take a virtual tour of our facility"
  }
]
```

### 5. Business Hours
- Weekly schedule display
- Current day highlighting
- Open/Closed status indicator
- Supports custom hours format

### 6. Amenities & Services
Organized sections for:
- Services Offered
- Amenities
- Payment Methods
- Languages Spoken

### 7. Reviews & Ratings
- Overall rating display
- Rating distribution chart
- Individual reviews with:
  - Star ratings
  - Author name
  - Date
  - Comment
- Write review form
- Empty state for no reviews

### 8. Contact Form
- Name, email, phone fields
- Message textarea
- Form validation
- Success/error states
- Loading indicator

### 9. Interactive Map
- OpenStreetMap embed (free alternative to Google Maps)
- Location marker
- Get Directions button
- View on Maps button
- Fallback for missing coordinates

## Directus Schema

### Required Fields
```typescript
{
  id: string;
  name: string;
  slug: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address_line1: string;
  city: string;
  state: string;
  zipcode: string;
}
```

### Optional Fields
```typescript
{
  // Display
  short_description?: string;
  tagline?: string;
  logo?: string;
  is_featured?: boolean;

  // Hero Configuration
  hero_type?: 'color' | 'image' | 'slideshow' | 'video';
  hero_color?: string;
  cover_image?: string;
  hero_video_url?: string;
  gallery?: string[];
  videos?: VideoItem[] | string[];

  // Business Details
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  amenities?: string[];
  services?: string[];
  payment_methods?: string[];
  languages?: string[];
  price_range?: string;
  year_established?: number;

  // Location
  address_line2?: string;
  latitude?: number;
  longitude?: number;

  // Social Media
  social_media?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };

  // Reviews (fetched separately or stored)
  rating_average?: string;
  review_count?: number;

  // Categories (relation)
  categories?: any[];
}
```

## Component Structure

```
frontend/app/business/
├── [slug]/
│   └── page.tsx                    # Main business detail page
└── components/
    ├── BusinessHero.tsx            # Flexible hero (YouTube/Vimeo/self-hosted)
    ├── BusinessInfoSidebar.tsx     # Sticky contact sidebar
    ├── BusinessGallery.tsx         # Photo gallery with lightbox
    ├── BusinessVideos.tsx          # Video gallery (YouTube/Vimeo/self-hosted)
    ├── BusinessHours.tsx           # Operating hours
    ├── BusinessAmenities.tsx       # Services & amenities
    ├── BusinessReviews.tsx         # Reviews & ratings
    ├── BusinessContactForm.tsx     # Contact form
    └── BusinessMap.tsx             # Interactive map
```

## Usage Examples

### Setting up a business with color hero:
```json
{
  "name": "Acme Plumbing",
  "hero_type": "color",
  "hero_color": "#2563eb"
}
```

### Setting up a business with image hero:
```json
{
  "name": "Shoreline Restaurant",
  "hero_type": "image",
  "cover_image": "https://example.com/hero.jpg"
}
```

### Setting up a business with slideshow:
```json
{
  "name": "Spa & Wellness",
  "hero_type": "slideshow",
  "gallery": [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/img3.jpg"
  ]
}
```

### Setting up a business with video hero:

**Using YouTube:**
```json
{
  "name": "Adventure Tours",
  "hero_type": "video",
  "hero_video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Using Vimeo:**
```json
{
  "name": "Creative Studio",
  "hero_type": "video",
  "hero_video_url": "https://vimeo.com/123456789"
}
```

**Using Self-hosted:**
```json
{
  "name": "Fitness Center",
  "hero_type": "video",
  "hero_video_url": "https://example.com/hero-video.mp4"
}
```

### Adding business hours:
```json
{
  "hours": {
    "monday": "9:00 AM - 5:00 PM",
    "tuesday": "9:00 AM - 5:00 PM",
    "wednesday": "9:00 AM - 5:00 PM",
    "thursday": "9:00 AM - 5:00 PM",
    "friday": "9:00 AM - 5:00 PM",
    "saturday": "10:00 AM - 2:00 PM",
    "sunday": "Closed"
  }
}
```

### Adding amenities and services:
```json
{
  "services": [
    "Emergency Plumbing",
    "Drain Cleaning",
    "Water Heater Installation",
    "Pipe Repair"
  ],
  "amenities": [
    "Free Estimates",
    "Licensed & Insured",
    "24/7 Emergency Service",
    "Warranty on Work"
  ],
  "payment_methods": [
    "Cash",
    "Credit Cards",
    "Checks",
    "Financing Available"
  ],
  "languages": [
    "English",
    "Spanish"
  ]
}
```

### Adding social media:
```json
{
  "social_media": {
    "facebook": "https://facebook.com/acmeplumbing",
    "instagram": "https://instagram.com/acmeplumbing",
    "twitter": "https://twitter.com/acmeplumbing"
  }
}
```

### Adding videos (simple format):
```json
{
  "videos": [
    "https://www.youtube.com/watch?v=VIDEO_ID_1",
    "https://www.youtube.com/watch?v=VIDEO_ID_2",
    "https://vimeo.com/123456789",
    "https://example.com/promo-video.mp4"
  ]
}
```

### Adding videos with metadata (detailed format):
```json
{
  "videos": [
    {
      "url": "https://www.youtube.com/watch?v=VIDEO_ID",
      "title": "Virtual Tour of Our Facility",
      "description": "Take a look inside our state-of-the-art facility"
    },
    {
      "url": "https://www.youtube.com/watch?v=VIDEO_ID_2",
      "title": "Customer Testimonial",
      "description": "Hear what our customers have to say"
    },
    {
      "url": "https://vimeo.com/123456789",
      "title": "Before & After Gallery",
      "description": "See the results of our work"
    }
  ]
}
```

## Flexibility for Any Niche

The business details page is designed to work with any local business niche:

### Restaurants
- Use **slideshow** hero with food photos
- Highlight **amenities**: Outdoor Seating, Takeout, Delivery
- **Services**: Catering, Private Events
- **Hours**: Full weekly schedule

### Home Services (Plumbing, HVAC, Electrical)
- Use **color** or **image** hero
- Highlight **services**: Emergency Service, Repairs, Installation
- **Amenities**: Licensed, Insured, Warranty
- **Payment Methods**: Various payment options

### Retail Stores
- Use **slideshow** hero with product photos
- Highlight **amenities**: Free Parking, Gift Cards, Returns
- **Services**: Personal Shopping, Custom Orders
- **Hours**: Store hours

### Professional Services (Lawyers, Accountants)
- Use **professional image** or **color** hero
- Highlight **services**: Consultations, Various specialties
- **Languages**: Multiple language support
- **Amenities**: Free Consultation, Virtual Meetings

### Entertainment & Recreation
- Use **video** hero showcasing activities
- Highlight **amenities**: Group Discounts, Birthday Packages
- **Services**: Various activities offered
- **Hours**: Operating schedule

## Customization

### Colors
The page uses Tailwind CSS classes. Main colors can be customized:
- Primary: `blue-600` (buttons, links)
- Featured badge: `yellow-500`
- Success: `green-600`
- Error: `red-600`

### Layout
- Desktop: 2-column layout (content + sidebar)
- Tablet: Stacked layout
- Mobile: Single column

### Typography
- Headings: Bold, large sizes
- Body: `text-gray-700`
- Links: `text-blue-600`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interactions

## Performance Considerations

- Lazy loading for images
- Optimized hero backgrounds
- Minimal JavaScript
- Efficient CSS with Tailwind

## Future Enhancements

Possible additions:
- Real-time availability booking
- Online ordering integration
- Customer reviews submission to Directus
- Business owner dashboard
- Analytics tracking
- SEO optimization with structured data
- Multi-language support
- Dark mode option

## License

Part of the South Suburbs Best directory project.
