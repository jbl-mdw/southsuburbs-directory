"use client";
import { useState } from "react";
import LocationsMenu from "./LocationsMenu";
import { MapPin } from "lucide-react";

export default function LocationsMenuWrapper({ cities }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 hover:text-blue-600 font-semibold flex items-center gap-2 px-4 py-2 transition-all hover:bg-blue-50 rounded-lg"
      >
        <MapPin className="w-5 h-5" />
        Explore Locations
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          ></div>
          <div 
            className="absolute left-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border border-gray-100"
            style={{
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              animation: 'slideDown 0.2s ease-out'
            }}
          >
            <LocationsMenu cities={cities} setIsOpen={setOpen} />
          </div>
        </>
      )}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
