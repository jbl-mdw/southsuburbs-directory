"use client";
import { useState, useRef, useEffect } from "react";
import LocationsMenu from "./LocationsMenu";

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
        className="relative z-20 text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 h-10"
        aria-expanded={open}
      >
        Explore Locations
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 z-50">
          <LocationsMenu initialCities={cities} />
        </div>
      )}
    </div>
  );
}
