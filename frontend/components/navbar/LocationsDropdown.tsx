"use client";
import { useState, useRef, useEffect } from "react";
import LocationsMenu from "./LocationsMenu";
import { MapPin } from "lucide-react";

export default function LocationsDropdown({ cities }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        className="relative z-20 text-gray-700 hover:text-blue-600 font-semibold flex items-center gap-2 px-4 py-2 transition-all hover:bg-blue-50 rounded-lg"
        aria-expanded={open}
      >
        <MapPin className="w-5 h-5" />
        Explore Locations
        <svg 
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div 
          className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-100 rounded-xl"
          style={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'slideDown 0.2s ease-out'
          }}
        >
          <LocationsMenu cities={cities} setIsOpen={setOpen} />
        </div>
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
