type CityCardProps = {
  href: string;
  img: string;
  title: string;
  className?: string;
};

const CityCard = ({ href, img, title, className = "" }: CityCardProps) => (
  <div
    className={`rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 ${className}`}
  >
    <Link href={href} className="block relative h-full group">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition duration-300 group-hover:opacity-80"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-start p-4 transition duration-300 group-hover:bg-opacity-60">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>
    </Link>
  </div>
);
