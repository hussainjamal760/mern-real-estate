import React from "react";

export default function CreateListing() {
  return (
    <div className="max-w-4xl mx-auto mt-18 px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Create a New Listing
      </h2>

      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter property name"
              required
              className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              required
              className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            placeholder="Enter property description"
            required
            className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
            rows="3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Regular Price</label>
            <input
              type="number"
              placeholder="0"
              required
              min="0"
              className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Discount Price</label>
            <input
              type="number"
              placeholder="0"
              required
              min="0"
              className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Bathrooms</label>
            <input
              type="number"
              placeholder="1"
              required
              min="1"
              className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Bedrooms</label>
            <input
              type="number"
              placeholder="1"
              required
              min="1"
              className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" required className="w-5 h-5 text-blue-600" />
            Furnished
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" required className="w-5 h-5 text-blue-600" />
            Parking
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" required className="w-5 h-5 text-blue-600" />
            Offer
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Type</label>
          <select
            required
            className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
          >
            <option value="">Select type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Images (max 6)</label>
          <input
            type="file"
            multiple
            required
            accept="image/*"
            className="w-full border-b-2 border-gray-300 px-2 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
}
