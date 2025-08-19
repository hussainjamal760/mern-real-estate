import { useState } from "react";
import { Menu, X, Search, Building } from "lucide-react";
import {Link} from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0 text-2xl font-bold">
            <Link to={'/'}>
                <Building size={40}/>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-full flex items-center justify-center">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/about" className="hover:text-blue-500">About</Link>
            <Link to="/sign-in" className="hover:text-blue-500">Sign In</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
{open && (
  <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
    <Link 
      to="/" 
      className="block w-full text-center py-2 rounded-md hover:bg-blue-50 hover:text-blue-500"
    >
      Home
    </Link>
    <Link 
      to="/about" 
      className="block w-full text-center py-2 rounded-md hover:bg-blue-50 hover:text-blue-500"
    >
      About
    </Link>
    <Link 
      to="/sign-in" 
      className="block w-full text-center py-2 rounded-md hover:bg-blue-50 hover:text-blue-500"
    >
      Sign In
    </Link>

    <div className="flex mt-2">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-full flex items-center justify-center">
        <Search size={18} />
      </button>
    </div>
  </div>
)}

    </nav>
  );
}
