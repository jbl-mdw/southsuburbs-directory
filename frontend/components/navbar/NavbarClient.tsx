"use client";
import Link from "next/link";
import Image from "next/image";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import LocationsDropdown from "./LocationsDropdown";
import { Grid3x3, MapPin } from "lucide-react";

export default function NavbarClient({ categories, cities }: any) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LEFT: Logo */}
          <div style={{ width: '250px' }}>
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="South Suburbs Best" width={400} height={133} className="h-14 w-auto" priority />
            </Link>
          </div>
          
          {/* CENTER: Navigation */}
          <div className="flex items-center gap-8">
            <div className="relative group">
              <div className="text-gray-700 hover:text-blue-600 font-semibold flex items-center gap-2 cursor-pointer">
                <Grid3x3 className="w-5 h-5" />
                Browse Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute left-0 top-full hidden group-hover:block pt-2">
                <CategoriesMegaMenu categories={categories} />
              </div>
            </div>
            <LocationsDropdown cities={cities} />
          </div>

          {/* RIGHT: Buttons */}
          <div className="flex items-center gap-4" style={{ width: '250px', justifyContent: 'flex-end' }}>
            <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg whitespace-nowrap">
              + Add Listing
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-semibold transition whitespace-nowrap">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
