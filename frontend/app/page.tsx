import CityCard from '@/components/CityCard';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedBusinesses from '@/components/FeaturedBusinesses';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section 
        className="relative text-white py-24 bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.8)), url(/hero.png)" 
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find the Best Local Businesses
          </h1>
          <p className="text-xl mb-8">
            Discover top-rated services in Chicago's South Suburbs
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Quick Category Icons */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {/* Home Services - WITH DROPDOWN */}
            <div className="relative group">
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition mb-2">
                  <svg className="w-10 h-10 text-blue-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Home Services</span>
              </div>
              
             {/* Dropdown */}
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="/category/hvac" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">🔥 HVAC</Link>
                  <Link href="/category/roofer" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">🏠 Roofer</Link>
                  <Link href="/category/plumber" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">🚰 Plumber</Link>
                  <Link href="/category/electrician" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">⚡ Electrician</Link>
                  <Link href="/category/landscaper" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">🌿 Landscaper</Link>
                  <Link href="/category/handyman" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">🔧 Handyman</Link>
                </div>
              </div> 
            </div>
                
            {/* Automotive */}
            <Link href="/category/automotive" className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition mb-2">
                <svg className="w-10 h-10 text-red-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Automotive</span>
            </Link>

            {/* Restaurants */}
            <Link href="/category/restaurants" className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-600 transition mb-2">
                <svg className="w-10 h-10 text-orange-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">Restaurants</span>
            </Link>

            {/* Real Estate */}
            <Link href="/category/real-estate" className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-600 transition mb-2">
                <svg className="w-10 h-10 text-green-600 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  <path d="M13 17v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2h4z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Real Estate</span>
            </Link>
          </div>
        </div>
      </section>

{/* --- 1. What's Happening In the South Suburbs (Cities) - FINAL LAYOUT --- */}
<section className="py-16 bg-white">
  <div className="mx-auto px-4 max-w-5xl">
    <h2 className="text-3xl font-bold text-center mb-10">
      What's Happening In the South Suburbs
    </h2>

    {/* GRID with 3 columns where column 3 is wider */}
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr] gap-4">

      {/* COLUMN 1 — TALL ORLAND PARK */}
      <div className="md:row-span-2">
        <CityCard
          href="/city/orland-park"
          img="/images/orland-park.jpg"
          title="Orland Park"
          className="h-[480px] md:h-full"
        />
      </div>

      {/* COLUMN 2 — TOP: Frankfort */}
      <div className="h-[230px]">
        <CityCard
          href="/city/frankfort"
          img="/images/frankfort.jpg"
          title="Frankfort"
          className="h-full"
        />
      </div>

      {/* COLUMN 3 — TOP: Flossmoor */}
      <div className="h-[230px]">
        <CityCard
          href="/city/flossmoor"
          img="/images/flossmoor.jpg"
          title="Flossmoor"
          className="h-full"
        />
      </div>

      {/* COLUMN 2 — BOTTOM: Glenwood */}
      <div className="h-[230px]">
        <CityCard
          href="/city/glenwood"
          img="/images/glenwood.jpg"
          title="Glenwood"
          className="h-full"
        />
      </div>

      {/* COLUMN 3 — BOTTOM ROW (two cards inside wider column) */}
      <div className="h-[230px] grid grid-cols-2 gap-4">
        <CityCard
          href="/city/tinley-park"
          img="/images/tinley-park.jpg"
          title="Tinley Park"
          className="h-full"
        />
        <CityCard
          href="/city/crestwood"
          img="/images/crestwood.jpg"
          title="Crestwood"
          className="h-full"
        />
      </div>

    </div>
  </div>
</section>



            {/* --- 2. Featured or What people are talking About (Testimonial) --- */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
                    <div className="lg:w-1/2">
                        <div className="bg-gray-300 h-96 w-full rounded-lg shadow-xl flex items-center justify-center">
                            [Placeholder for Testimonial Video/Image]
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Featured or What people are talking About
                        </h2>
                        <blockquote className="italic text-lg text-gray-600 mb-4 border-l-4 border-blue-500 pl-4">
                            &quot;We have exceeded our goals for how many people are going to our website, staying on our website...&quot;
                        </blockquote>
                        <p className="font-semibold text-gray-800">Richard Jeans</p>
                        <p className="text-sm text-gray-500">DX Media, Cortland, OH</p>
                    </div>
                </div>
            </section>

            {/* --- 3. Claim your Business (CTA) --- */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-10">
                        Claim & Get Started Today!
                    </h2>
                    <p className="text-gray-600 mb-12">
                        Nearly 80% of consumers turn to directories with reviews to find a local business.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
                            <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">✅</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Claim</h3>
                            <p className="text-gray-600 mb-4">
                                Best way to start managing your business listing is by claiming it so you can update.
                            </p>
                            <Link href="/submit" className="text-blue-600 font-medium hover:underline">
                                Learn More →
                            </Link>
                        </div>

                        <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
                            <div className="w-16 h-16 mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Promote</h3>
                            <p className="text-gray-600 mb-4">
                                Promote your business to target customers who need your services or products.
                            </p>
                            <Link href="/submit" className="text-blue-600 font-medium hover:underline">
                                Learn More →
                            </Link>
                        </div>

                        <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
                            <div className="w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Convert</h3>
                            <p className="text-gray-600 mb-4">
                                Promote your business to target customers who need your services or products.
                            </p>
                            <Link href="/submit" className="text-blue-600 font-medium hover:underline">
                                Learn More →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. Exclusive & Popular (Businesses) --- */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        Exclusive & Popular
                    </h2>
                    {/* Placeholder Grid for Businesses */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <img src="/images/placeholder-restaurant.jpg" alt="Restaurant" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">The Mark Hotel</h3>
                                <div className="text-yellow-500 my-2">★★★★☆ (60)</div>
                                <p className="text-sm text-gray-600">Restaurant, $$$</p>
                                <p className="text-sm text-gray-600">📍 New York | Open Now</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <img src="/images/placeholder-art.jpg" alt="Art Club" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">Arizona Luxury Art Club</h3>
                                <div className="text-yellow-500 my-2">★★★★★ (2)</div>
                                <p className="text-sm text-gray-600">Services</p>
                                <p className="text-sm text-gray-600">📍 Washington | Day Off</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <img src="/images/placeholder-realestate.jpg" alt="Real Estate" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">Shoreline Village</h3>
                                <div className="text-yellow-500 my-2">★★★★★ (3)</div>
                                <p className="text-sm text-gray-600">Real Estate, $$</p>
                                <p className="text-sm text-gray-600">📍 Austin | Open Now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. News & Tips Section --- */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        News & Tips
                    </h2>
                    {/* Placeholder Grid for News */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="/images/placeholder-news1.jpg" alt="News" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <p className="font-semibold mb-2">Excited news about arrival fashion.</p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>News</span>
                                    <span>📅 January 1, 2020</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="/images/placeholder-news2.jpg" alt="News" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <p className="font-semibold mb-2">Reduce Unwanted Wrinkles</p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Coffee</span>
                                    <span>📅 January 1, 2020</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="/images/placeholder-news3.jpg" alt="News" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <p className="font-semibold mb-2">Chemex coffee for two people</p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Coffee</span>
                                    <span>📅 January 1, 2020</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- 6. Final CTA Section --- */}
            <section className="py-20 bg-gray-800 text-white">
                <div className="container mx-auto px-4 flex justify-between items-center bg-cover bg-center"
                     style={{backgroundImage: 'url(/images/business-cta-bg.jpg)'}}
                >
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold mb-3">Are You a Local Business?</h2>
                        <p className="mb-6">Join the community of hundreds of flourishing local business in your city.</p>
                        <Link href="/submit" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                            Get Started
                        </Link>
                        <Link href="/submit" className="border border-white text-white px-6 py-3 ml-4 rounded-md font-semibold hover:bg-white hover:text-gray-800 transition">
                            Claim Your Business
                        </Link>
                    </div>
                </div>
            </section>
    </main>
  );
}
