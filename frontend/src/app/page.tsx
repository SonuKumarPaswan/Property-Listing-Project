import Navbar from "@/components/layout/Navbar";
import PropertyCard from "@/components/property/PropertyCard";
import { useState } from "react";
export default function Home() {
  // const[searchLocation, setSearchLocation] = useState("");

  return (
    <div>
      <Navbar />
      <section className="relative py-20  h-screen flex items-center justify-center text-center text-white">
        <div className=" h-full  absolute inset-0 bg-[url('https://kmhengineering.com/images/projects/spiranova/3.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
            <span className="text-blue-500 hover:text-red-500">Find Your</span> Dream Home
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
      
      <PropertyCard />
      
     
    </div>
  );
}
