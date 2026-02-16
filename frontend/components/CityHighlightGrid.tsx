// components/CityHighlightGrid.tsx
import Image from "next/image";

type City = {
  name: string;
  image: string;
};

const cities: City[] = [
  { name: "Orland Park", image: "/cities/orland-park.jpg" },
  { name: "Homewood", image: "/cities/homewood.jpg" },
  { name: "Flossmoor", image: "/cities/flossmoor.jpg" },
  { name: "Glenwood", image: "/cities/glenwood.jpg" },
  { name: "Tinley Park", image: "/cities/tinley-park.jpg" },
  { name: "Frankfort", image: "/cities/frankfort.jpg" },
];

function Tile({ city }: { city: City }) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-slate-900">
      <Image src={city.image} alt={city.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 p-4">
        <p className="text-lg font-semibold text-white">{city.name}</p>
      </div>
    </div>
  );
}

export default function CityHighlightGrid() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            South Suburbs Cities
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Explore the neighborhoods we're starting with in Chicago's Southland.
          </p>
        </div>
        {/* DESKTOP GRID */}
        <div className="hidden md:grid gap-3 grid-cols-[1fr_1fr_1.6fr] grid-rows-[220px_220px]">
          <div className="row-span-2">
            <Tile city={cities[0]} />
          </div>
          <Tile city={cities[1]} />
          <Tile city={cities[2]} />
          <Tile city={cities[3]} />
          <div className="grid grid-cols-2 gap-3">
            <Tile city={cities[4]} />
            <Tile city={cities[5]} />
          </div>
        </div>
      </div>
    </section>
  );
}
