export default function PropertyCard() {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer max-w-sm mx-auto mb-6 flex flex-col ">
      <img
        src="https://kmhengineering.com/images/projects/spiranova/3.jpg"
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          3BHK Flat in Noida
        </h2>
        <p className="text-gray-500">Sector 62</p>

        <div className="flex justify-between mt-2">
          <span className="text-blue-600 font-bold">₹50L</span>
          <button>❤️</button>
        </div>
      </div>
    </div>
  );
}