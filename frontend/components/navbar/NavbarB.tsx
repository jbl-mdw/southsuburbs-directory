export default function NavbarB() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a href="/" className="font-bold text-xl text-blue-700">
            South Suburbs Best
          </a>
          <div className="hidden md:flex items-center space-x-4 text-gray-700">
            <a href="/explore" className="hover:text-blue-600">Explore</a>
            <a href="/categories" className="hover:text-blue-600">Categories</a>
            <a href="/locations" className="hover:text-blue-600">Locations</a>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/add-listing"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 shadow-sm hover:bg-blue-700"
          >
            + Add Listing
          </a>
          <a href="/auth/sign-in" className="text-gray-700 hover:text-blue-600">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
}
