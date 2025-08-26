import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from '../components/Contact';


export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false); 
  const {currentUser} = useSelector((state) => state.user);



  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  useEffect(() => {
    if (listing?.imageUrls.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === listing.imageUrls.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [listing]);

  const goToSlide = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? listing.imageUrls.length - 1 : prev - 1
    );
  const nextSlide = () =>
    setCurrentIndex((prev) =>
      prev === listing.imageUrls.length - 1 ? 0 : prev + 1
    );

  return (
    <main className="mt-20">
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <p className="text-center my-7 text-2xl text-red-600 font-semibold">
          Something went wrong!
        </p>
      )}

      {listing && !loading && !error && (
        <div className="flex justify-center relative">
          <div className="relative w-[1000px] h-[500px] overflow-hidden rounded-2xl shadow-2xl border border-gray-200">
            <div
              className="w-full h-full bg-center bg-cover transition-all duration-700"
              style={{
                backgroundImage: `url(${listing.imageUrls[currentIndex]})`,
              }}
            ></div>

            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition"
            >
              ❮
            </button>

            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition"
            >
              ❯
            </button>

            <div className="absolute bottom-4 w-full flex justify-center gap-3">
              {listing.imageUrls.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full cursor-pointer transition-all shadow ${
                    currentIndex === index
                      ? "bg-white scale-125"
                      : "bg-gray-400 hover:bg-white"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-[13%] right-[3%] z-10 shadow-lg border rounded-full w-12 h-12 flex justify-center items-center bg-white cursor-pointer hover:scale-110 transition">
        <FaShare
          className="text-slate-600 text-xl"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        />
      </div>

      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-green-500 text-white px-4 py-2 shadow-md animate-bounce">
          ✅ Link copied!
        </p>
      )}

      {listing && (
        <div className="flex flex-col max-w-5xl mx-auto p-6 my-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
          <p className="text-3xl font-bold text-gray-900 flex justify-between items-center">
            {listing.name}
            <span className="text-green-700 text-2xl font-semibold">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </span>
          </p>

          <p className="flex items-center mt-4 gap-2 text-gray-600 text-lg">
            <FaMapMarkerAlt className="text-red-600 text-xl" />
            {listing.address}
          </p>

          <div className="flex gap-4 mt-4">
            <p className="bg-blue-600 text-white px-4 py-2 rounded-full shadow text-sm font-semibold">
              {listing.type === "rent" ? "🏠 For Rent" : "🏡 For Sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-600 text-white px-4 py-2 rounded-full shadow text-sm font-semibold">
                Save ${+listing.regularPrice - +listing.discountPrice}
              </p>
            )}
          </div>

          <p className="text-gray-700 mt-6 leading-relaxed text-lg">
            <span className="font-bold text-gray-900">Description:</span>{" "}
            {listing.description}
          </p>

          <ul className="text-gray-900 font-medium text-lg flex flex-wrap items-center gap-6 mt-6">
            <li className="flex items-center gap-2">
              <FaBed className="text-2xl text-blue-700" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : `${listing.bedrooms} Bedroom`}
            </li>
            <li className="flex items-center gap-2">
              <FaBath className="text-2xl text-cyan-700" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : `${listing.bathrooms} Bathroom`}
            </li>
            <li className="flex items-center gap-2">
              <FaParking className="text-2xl text-yellow-600" />
              {listing.parking ? "Parking Available" : "No Parking"}
            </li>
            <li className="flex items-center gap-2">
              <FaChair className="text-2xl text-purple-600" />
              {listing.furnished ? "Fully Furnished" : "Unfurnished"}
            </li>
          </ul>
             {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
        </div>
      )}
    </main>
  );
}
