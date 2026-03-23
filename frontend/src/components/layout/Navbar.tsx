"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Mishti Houses
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/properties" className="hover:text-blue-600">
            Properties
          </Link>
          <Link href="/wishlist" className="hover:text-blue-600">
            Wishlist
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href="/sign-in"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/owner/add-property"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Property
          </Link>
        </div>
      </div>
    </nav>
  );
}