"use client";
import React, { useState } from "react";

const Page = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "2BHK Flat in Delhi",
      price: "₹25,000/month",
      image: "https://content.mediastg.net/dyna_images/mls/105132/60564.jpgx?h=540&d=0",
      location: "Delhi",
    },
    {
      id: 2,
      title: "Luxury Villa",
      price: "₹1,00,000/month",
      image: "https://content.mediastg.net/dyna_images/mls/105132/60564.jpgx?h=540&d=0",
      location: "Mumbai",
    },
  ]);

  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border p-4 rounded-xl shadow">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>{item.location}</p>
              <p className="font-bold">{item.price}</p>

              <button
                onClick={() => removeItem(item.id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
