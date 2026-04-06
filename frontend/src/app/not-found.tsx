"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center min-h-screen text-white"
      style={{
        background:
          "linear-gradient(160deg, #020617 0%, #041C32 55%, #0a3040 100%)",
      }}
    >
      <div className="text-center p-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
        
        <h1 className="text-8xl font-extrabold mb-4 tracking-wider">404</h1>
        
        <h2 className="text-2xl font-semibold mb-2">
          Oops! Page Not Found 😢
        </h2>

        <p className="text-gray-300 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg shadow-md hover:bg-cyan-300 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;