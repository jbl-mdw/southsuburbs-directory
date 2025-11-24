"use client";

interface Category {
  id: string;
  name: string;
  slug: string;
  parent_category_id: string | null;
}

export default function CategoriesMegaMenu({ categories }: { categories: Category[] }) {
  const parents = categories.filter((c) => !c.parent_category_id);
  const getChildren = (parentId: string) => categories.filter((c) => c.parent_category_id === parentId);
  
  const homeServices = parents.find(p => p.name === "Home Services");
  const realEstate = parents.find(p => p.name === "Real Estate");
  
  const otherParents = parents.filter(p => 
    p.name !== "Home Services" && 
    p.name !== "Real Estate" &&
    p.name !== "Health & Wellness" &&
    getChildren(p.id).length > 0
  ).slice(0, 4);

  const featuredHomeServices = ["HVAC", "Roofing", "Plumbing", "Electrical", "Handyman", "Landscaping", "Painting"];

  return (
    <div className="w-[750px] bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden">
      {/* Featured Services Row */}
      <div className="grid grid-cols-2 divide-x border-b">
        {/* Home Services */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-white">
          <a href="/category/home-services" className="block font-bold text-lg text-gray-900 hover:text-blue-600 transition mb-3">
            🏠 Home Services
          </a>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {featuredHomeServices.map((service) => (
              <a key={service} href={`/category/${service.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-700 hover:text-blue-600 transition">
                {service}
              </a>
            ))}
          </div>
        </div>

        {/* Real Estate */}
        <div className="p-4 bg-gradient-to-br from-green-50 to-white">
          <a href="/category/real-estate" className="block font-bold text-lg text-gray-900 hover:text-green-600 transition mb-3">
            🏡 Real Estate
          </a>
          <div className="space-y-1.5">
            <a href="/category/real-estate" className="block text-sm text-gray-700 hover:text-green-600 transition">Buy a Home</a>
            <a href="/category/real-estate" className="block text-sm text-gray-700 hover:text-green-600 transition">Sell a Home</a>
            <a href="/category/real-estate" className="block text-sm text-gray-700 hover:text-green-600 transition">Find an Agent</a>
            <a href="/category/real-estate" className="block text-sm text-gray-700 hover:text-green-600 transition">Property Management</a>
          </div>
        </div>
      </div>

      {/* Health & Wellness with Pastel Sections */}
      <div className="border-b">
        <div className="p-4">
          <div className="font-bold text-lg text-gray-900 mb-3">💚 Health & Wellness</div>
          <div className="grid grid-cols-3 gap-3">
            {/* Medical Health */}
            <div className="bg-red-50 rounded-lg p-3">
              <div className="font-semibold text-sm text-gray-900 mb-2">Medical Health</div>
              <div className="space-y-1">
                <a href="/category/chiropractors" className="block text-xs text-gray-700 hover:text-red-600 transition">Chiropractors</a>
                <a href="/category/dentists" className="block text-xs text-gray-700 hover:text-red-600 transition">Dentists</a>
                <a href="/category/doctors" className="block text-xs text-gray-700 hover:text-red-600 transition">Doctors</a>
                <a href="/category/physical-therapy" className="block text-xs text-gray-700 hover:text-red-600 transition">Physical Therapy</a>
              </div>
            </div>

            {/* Fitness */}
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="font-semibold text-sm text-gray-900 mb-2">Fitness</div>
              <div className="space-y-1">
                <a href="/category/gyms-fitness" className="block text-xs text-gray-700 hover:text-orange-600 transition">Gyms & Fitness</a>
                <a href="/category/personal-training" className="block text-xs text-gray-700 hover:text-orange-600 transition">Personal Training</a>
                <a href="/category/yoga" className="block text-xs text-gray-700 hover:text-orange-600 transition">Yoga Studios</a>
                <a href="/category/pilates" className="block text-xs text-gray-700 hover:text-orange-600 transition">Pilates</a>
              </div>
            </div>

            {/* Alternative Health */}
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="font-semibold text-sm text-gray-900 mb-2">Alternative Health</div>
              <div className="space-y-1">
                <a href="/category/acupuncture" className="block text-xs text-gray-700 hover:text-purple-600 transition">Acupuncture</a>
                <a href="/category/massage-therapy" className="block text-xs text-gray-700 hover:text-purple-600 transition">Massage Therapy</a>
                <a href="/category/holistic-medicine" className="block text-xs text-gray-700 hover:text-purple-600 transition">Holistic Medicine</a>
                <a href="/category/naturopathy" className="block text-xs text-gray-700 hover:text-purple-600 transition">Naturopathy</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Categories */}
      <div className="p-4 grid grid-cols-2 gap-5">
        {otherParents.map((parent) => {
          const children = getChildren(parent.id);
          return (
            <div key={parent.id} className="space-y-1.5">
              <a href={`/category/${parent.slug}`} className="block font-semibold text-gray-900 hover:text-blue-600 transition text-sm">
                {parent.name}
              </a>
              <div className="space-y-0.5">
                {children.slice(0, 4).map((child) => (
                  <a key={child.id} href={`/category/${child.slug}`} className="block text-xs text-gray-600 hover:text-blue-600 transition">
                    {child.name}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2.5 border-t">
        <a href="/explore" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
          View All Categories →
        </a>
      </div>
    </div>
  );
}
