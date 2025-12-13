// components/CityHighlightGrid.tsx
import Image from 'next/image';

const cities = [
  { name: 'Orland Park', image: '/cities/orland-park.jpg' },
  { name: 'Homewood', image: '/cities/homewood.jpg' },
  { name: 'Flossmoor', image: '/cities/flossmoor.jpg' },
  { name: 'Glenwood', image: '/cities/glenwood.jpg' },
  { name: 'Tinley Park', image: '/cities/tinley-park.jpg' },
  { name: 'Frankfort', image: '/cities/frankfort.jpg' },
];

export default function CityHighlightGrid() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            South Suburbs Cities
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Explore the neighborhoods we’re starting with in Chicago’s Southland.
          </p>
        </div>

        {/* 2 rows, 3 cols — left tile spans 2 rows */}
        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr] md:auto-rows-[220px]">
          {cities.map((city, index) => {
            const span = index === 0 ? 'md:row-span-2' : '';

            return (
              <div
                key={city.name}
                className={`relative h-full overflow-hidden rounded-2xl bg-slate-900 ${span}`}
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-lg font-semibold text-white drop-shadow">
                    {city.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
