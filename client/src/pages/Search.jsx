import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (["all", "rent", "sale", "offer"].includes(e.target.id)) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex mt-18 flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-xl p-6 border-r">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Type */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Type</p>
            <div className="flex flex-wrap gap-4">
              {["all", "rent", "sale", "offer"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={type}
                    className="w-5 h-5 accent-blue-600"
                    onChange={handleChange}
                    checked={sidebardata.type === type}
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Amenities</p>
            <div className="flex flex-wrap gap-4">
              {["parking", "furnished"].map((amenity) => (
                <label key={amenity} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={amenity}
                    className="w-5 h-5 accent-blue-600"
                    onChange={handleChange}
                    checked={sidebardata[amenity]}
                  />
                  <span className="capitalize">{amenity}</span>
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
              onChange={handleChange}
              value={`${sidebardata.sort}_${sidebardata.order}`}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="price_desc">Price high to low</option>
              <option value="price_asc">Price low to high</option>
              <option value="created_at_desc">Latest</option>
              <option value="created_at_asc">Oldest</option>
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
          {loading ? (
            <p>Loading...</p>
          ) : listings.length > 0 ? (
            listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white shadow-md rounded-xl p-4"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                <h3 className="font-semibold text-lg">{listing.name}</h3>
                <p className="text-gray-600 text-sm">
                  {listing.bedrooms} Bed • {listing.bathrooms} Bath •{" "}
                  {listing.squareFeet} sqft
                </p>
                <p className="mt-2 font-bold text-blue-600">
                  ${listing.price} {listing.type === "rent" && "/ month"}
                </p>
              </div>
            ))
          ) : (
            <p>No listings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
