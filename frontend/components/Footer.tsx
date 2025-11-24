import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#072338] text-white mt-16">
      {/* Top nav strip */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-center gap-4">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link href="/blog" className="hover:text-gray-200">
              Blog
            </Link>
            <Link href="/listings" className="hover:text-gray-200">
              Listings
            </Link>
            <Link href="/about" className="hover:text-gray-200">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-gray-300">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} South Suburbs Best • Chicago Southland, IL
          </p>
          <p className="text-center md:text-right">
            Powered by <span className="font-semibold">Leads Grow Revenue</span> • AI Automation &amp; Local Marketing
          </p>
        </div>
      </div>
    </footer>
  );
}
