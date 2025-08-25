import React from "react";

export default function Search() {
  return (
    <div className="flex mt-18 flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-xl p-6 border-r">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>

        <form className="flex flex-col gap-6">
          {/* Search Term */}
          <div>
            <label
              htmlFor="searchTerm"
              className="block font-semibold text-gray-700 mb-2"
            >
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search properties..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>

          {/* Type */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Type</p>
            <div className="flex flex-wrap gap-4">
              {["All", "Rent", "Sale", "Offer"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Amenities</p>
            <div className="flex flex-wrap gap-4">
              {["Parking", "Furnished"].map((amenity) => (
                <label key={amenity} className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-blue-600" />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <label
              htmlFor="sort_order"
              className="block font-semibold text-gray-700 mb-2"
            >
              Sort
            </label>
            <select
              id="sort_order"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          {/* Button */}
          <button className="bg-blue-600 text-white py-3 rounded-xl shadow-md uppercase hover:bg-blue-700 transition">
            Search
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
          Listing Results
        </h1>

        {/* Example placeholder for results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-4">
            <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
            <h3 className="font-semibold text-lg">Sample Property</h3>
            <p className="text-gray-600 text-sm">2 Bed • 2 Bath • 1200 sqft</p>
            <p className="mt-2 font-bold text-blue-600">$1200 / month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
