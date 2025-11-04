import React from "react";

type Category = { name: string; slug: string };
type HeroProps = {
  cityName: string;
  blurb?: string;
  categories: Category[];
};

export function HeroSection({ cityName, blurb, categories }: HeroProps) {
  return (
    <section className="relative w-full text-white bg-gray-900/90 bg-cover bg-center py-16">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3">
          Explore {cityName}
        </h1>
        <p className="text-gray-200 text-base md:text-lg mb-8">
          {blurb || `Find trusted local pros in ${cityName} now.`}
        </p>

        <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row gap-4 md:items-center p-4 md:p-2 max-w-3xl mx-auto text-left">
          <div className="flex-1 md:border-r md:pr-4">
            <label className="text-xs font-medium text-gray-600">What</label>
            <input
              className="w-full text-gray-800 font-medium bg-transparent outline-none placeholder-gray-400"
              placeholder="Ex: furnace repair, leak, electrical"
            />
          </div>
          <div className="flex-1 md:border-r md:px-4">
            <label className="text-xs font-medium text-gray-600">Where</label>
            <input
              className="w-full text-gray-800 font-medium bg-transparent outline-none placeholder-gray-400"
              placeholder={`${cityName} or nearby suburb`}
            />
          </div>
          <div className="md:pl-4">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-3 text-sm">
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories?.slice(0, 8).map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-medium px-3 py-2 rounded-full border border-white/20 transition"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 to-gray-900/95" />
    </section>
  );
}
