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
import {Link} from "react-router-dom"

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

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

  const handleDelete=async()=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}` , {
        method:'DELETE',
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut =async () =>{
    try {
      dispatch(SignOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }      
      dispatch(SignOutUserSuccess(data))
    } catch (error) {
      dispatch(SignOutUserFailure(data.message))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-10 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-center mb-5">
          <img
            src={currentUser?.avatar}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>

            <div className="mt-3 flex justify-center">
  <Link
    to="/create-listing"
 className=" w-full py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"  >
    Create New Listing
  </Link>
</div>

        <div className="flex justify-between mt-5">
          <button onClick={handleSignOut} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            Sign Out
          </button>
          <button onClick={handleDelete} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md">
            Delete
          </button>
        </div>
        


        <div className="mt-4 text-center">
          {error && <span className="text-red-600">{error}</span>}
          {success && (
            <span className="text-green-600">User Updated Successfully</span>
          )}
        </div>
      </div>
    </div>
  );
}
