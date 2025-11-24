"use client";
import Link from "next/link";
import Image from "next/image";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import LocationsDropdown from "./LocationsDropdown";

export default function NavbarClient({ categories, cities }: any) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="South Suburbs Best" width={400} height={133} className="h-16 w-auto" priority />
        </Link>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 h-10 cursor-pointer">
              Explore Categories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="absolute right-0 top-full hidden group-hover:block pt-2">
              <CategoriesMegaMenu categories={categories} />
            </div>
          </div>

          <LocationsDropdown cities={cities} />

          <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg">
            + Add Listing
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600 font-semibold transition">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
