import PropertyCard from "@/components/property/PropertyCard";
export default function Home() {
  return (
    <div>
      <section className="relative py-20  h-screen flex items-center justify-center text-center text-white">
        {/* Background Image */}
        <div className=" h-full  absolute inset-0 bg-[url('https://kmhengineering.com/images/projects/spiranova/3.jpg')] bg-cover bg-center"></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Home
          </h1>
          <p className="mb-6 text-lg">
            Buy, Sell or Rent properties easily with Mishti Houses
          </p>

          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <input
              type="text"
              placeholder="Enter city or location"
              className="px-4 py-3 rounded-lg text-black w-full md:w-80"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-lg">Search</button>
          </div>

        </div>
      </section>
         
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6"> Noida Properties  </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Delhi Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Mumbai Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
      </section>
    </div>
  );
}
