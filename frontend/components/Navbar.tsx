import Link from 'next/link';

export default async function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">SouthSuburbsBest</Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/listings">Listings</Link>
          
          <div className="relative group cursor-pointer">
            <span className="flex items-center">Explore Locations <span className="ml-1">▾</span></span>
            <div className="absolute hidden group-hover:grid grid-cols-2 p-4 bg-white border shadow-xl z-50 min-w-[300px] top-full">
              {/* FIXED PATHS: Matches your /location/ directory */}
              <Link href="/location/flossmoor" className="hover:text-blue-600 py-1">Flossmoor</Link>
              <Link href="/location/frankfort" className="hover:text-blue-600 py-1">Frankfort</Link>
              <Link href="/location/tinley-park" className="hover:text-blue-600 py-1">Tinley Park</Link>
              <Link href="/location/orland-park" className="hover:text-blue-600 py-1">Orland Park</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
