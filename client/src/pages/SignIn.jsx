import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setSuccess(data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setLoading(false);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-300 to-white pt-20">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
         Login Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            id="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="flex items-center my-3">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-500 text-xs">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded-xl flex items-center justify-center hover:bg-gray-100 transition text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-xl">
            {success} — redirecting...
          </div>
        )}

        <p className="text-center text-gray-600 text-xs mt-5">
          Dont have an account?{" "}
          <Link
            to={"/sign-up"}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <p className="text-center text-gray-400 text-xs mt-2">
          — Login today and continue your the Real Estate World —
        </p>
      </div>
    </div>
  );
}
