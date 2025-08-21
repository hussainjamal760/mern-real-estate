import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-10 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-center mb-5">
          <img
            src={currentUser.avatar}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser?.username}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={currentUser?.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button className="mt-5 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
          Update Account
        </button>

        <div className="flex justify-between mt-5">
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            Sign Out
          </button>
          <button className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}