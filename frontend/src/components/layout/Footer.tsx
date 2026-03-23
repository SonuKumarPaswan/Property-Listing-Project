export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">Mishti Houses</h2>
          <p className="text-gray-300">
            Find your dream property easily with us.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Home</li>
            <li>Properties</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-300">Email: support@mishtihouses.com</p>
          <p className="text-gray-300">Phone: +91 9876543210</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm pb-4">
        © {new Date().getFullYear()} Mishti Houses. All rights reserved.
      </div>
    </footer>
  );
}