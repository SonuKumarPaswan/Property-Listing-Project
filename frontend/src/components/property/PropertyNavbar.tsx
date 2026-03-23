import SearchBar from '../shared/SearchBar'
import { IoIosContact } from "react-icons/io";
import { AiOutlineMenuFold } from "react-icons/ai";
import { BsHouseAdd } from "react-icons/bs";
import Link from 'next/link';

const PropertyNavbar = () => {
  return (
    <nav className="bg-white shadow flex items-center justify-evenly px-4 py-2">
       <div>
        <Link href="/"><h1 className="text-xl font-bold text-gray-800">Mishti Houses</h1></Link>
       </div>

       <div className="flex items-center gap-4 w-full max-w-[700px]">
        <SearchBar /> 
       </div>
       <div>
        <button className="text-gray-800 hover:text-gray-600 border border-gray-300 rounded-md py-1 px-3"> Add Property <BsHouseAdd className="inline-block" size={20} /> </button>
        <button className="ml-4 text-gray-800 hover:text-gray-600 border border-gray-300 rounded-md py-1 px-2">Sign Up</button>
        <button className="ml-4 text-gray-800 hover:text-gray-600"> <IoIosContact className="inline-block" size={30} /></button>
        <button className="ml-4 text-gray-800 hover:text-gray-600"><AiOutlineMenuFold className="inline-block" size={30} /></button>
       </div>
    </nav>
  )
}

export default PropertyNavbar
