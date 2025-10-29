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

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Browse by Category
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Businesses
          </h2>
          <FeaturedBusinesses />
        </div>
      </section>
    </main>
  );
}
