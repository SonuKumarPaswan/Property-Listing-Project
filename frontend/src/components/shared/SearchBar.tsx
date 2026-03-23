"use client";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
    const [query, setQuery] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement search logic here
    };


  return (
    <div className="w-full max-w-[700px] mx-auto bg-white  rounded-md shadow focus:border:ring-blue-300">
      <form action="" className="flex gap-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300  rounded-md " onSubmit={handleSubmit}>
        <select className="flex items-center gap-2 px-3 py-2 outline-none rounded-md" >
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
          <option value="sale">Sale</option>
        </select>
        <input
          type="text"
          placeholder="Search properties..."
          className=" flex-grow px-2 py-1 focus:outline-none"
          value={query}          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600  text-white rounded p-2 flex items-center ml-9">
           <IoSearchOutline className="inline-block mr-1" /> Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
