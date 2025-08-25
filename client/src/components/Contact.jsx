import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false); // modal toggle

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <>
          {/* Button to open modal */}
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-600 mt-3 text-white px-4 py-4 rounded-lg hover:bg-slate-700 transition"
          >
            Contact {landlord.username}
          </button>

          {/* Modal */}
          {open && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Contact {landlord.username}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Regarding: <span className="font-medium">{listing.name}</span>
                </p>

                <textarea
                  name="message"
                  id="message"
                  rows="3"
                  value={message}
                  onChange={onChange}
                  placeholder="Enter your message here..."
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>

                <Link
                  to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                  className="block w-full mt-4 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setOpen(false)}
                >
                  Send Message
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
