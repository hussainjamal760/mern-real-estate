import { useState } from "react";
import { Menu, X, Search, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold flex items-center gap-2 text-blue-600">
  <Link to={"/"} className="flex items-center gap-2">
    <img 
      src="/src/assets/logo.jpg" 
      alt="Logo" 
      className="w-16 h-16 rounded-full object-cover" 
    />
  </Link>
</div>


          <div className="hidden md:flex flex-1 justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex w-full max-w-md">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) =>setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-full flex items-center justify-center border-none transition">
                <Search size={18} />
              </button>
            </div>
                </form>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition">
              About
            </Link>

            {currentUser ? (
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  className="rounded-full h-9 w-9 object-cover border-2 border-blue-500 hover:scale-105 transition"
                  src={currentUser.avatar}
                  alt="profile"
                />
              </Link>
            ) : (
              <Link
                to="/sign-in"
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2 animate-slideDown">
          <Link
            to="/"
            className="block w-full text-center py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block w-full text-center py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link to="/profile" className="flex justify-center items-center">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border border-blue-400"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="text-blue-600 font-medium">Sign In</span>
            )}
          </Link>

          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-full flex items-center justify-center transition">
              <Search size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
