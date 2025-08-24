import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  SignOutUserFailure,
  SignOutUserStart,
  SignOutUserSuccess,
} from "../redux/user/userSlice.js";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignOutUserFailure(data.message));
        return;
      }
      dispatch(SignOutUserSuccess(data));
    } catch (error) {
      dispatch(SignOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      setShowModal(true);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Panel */}
      <div className="w-1/3 bg-white shadow-lg flex flex-col items-center justify-center p-6">
        <img
          src={currentUser?.avatar}
          alt="profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {currentUser?.username}
        </h2>
        <p className="text-gray-500">{currentUser?.email}</p>

        <button
          onClick={handleSignOut}
          className="mt-6 w-40 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Sign Out
        </button>
        <button
          onClick={handleDelete}
          className="mt-3 w-40 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete Account
        </button>
      </div>

      {/* Right Panel */}
      <div className="flex-1 mt-12 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className=" space-y-4">
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>

        <Link
          to="/create-listing"
          className="block mt-5 w-full text-center py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition shadow-md"
        >
          Create New Listing
        </Link>

        <button
          onClick={handleShowListings}
          className="mt-4 w-full py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition"
        >
          Show Listings
        </button>

        <p className="text-red-700 mt-3">
          {showListingsError ? "Error showing listings" : ""}
        </p>

        {error && (
          <p className="text-red-600 mt-3 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 mt-3 text-center">
            User Updated Successfully
          </p>
        )}
      </div>

      {/* ✅ Listings Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            <h1 className="text-center mb-4 text-2xl font-semibold">
              Your Listings
            </h1>

            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-3 flex justify-between items-center gap-4"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <Link
                    className="text-slate-700 font-semibold hover:underline truncate flex-1"
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>

                  <div className="flex flex-col items-center gap-1">
                    <button className="text-red-700 uppercase text-sm">
                      Delete
                    </button>
                    <button className="text-green-700 uppercase text-sm">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
