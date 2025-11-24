"use client";
import { useState } from "react";

export default function LocationsMenuWrapper({ cities }: any) {
  const [open, setOpen] = useState(false);

  console.log("LocationsMenuWrapper rendered, cities:", cities);

  return (
    <div className="relative">
      <button 
        onClick={() => {
          console.log("Button clicked! Current state:", open);
          setOpen(!open);
        }} 
        className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 h-10 bg-yellow-100 px-4"
      >
        Explore Locations TEST
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 z-50 bg-red-500 text-white p-4">
          DROPDOWN IS OPEN - {cities.length} cities
        </div>
      )}
    </div>
  );
}
