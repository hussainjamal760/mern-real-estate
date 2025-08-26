import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListinItem";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // slider states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
        fetchRentListings();
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
        fetchSaleListings();
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
        setLoading(false);

        // collect all images for slider
        const imgs = [
          ...offerListings.flatMap((l) => l.imageUrls || []),
          ...rentListings.flatMap((l) => l.imageUrls || []),
          ...data.flatMap((l) => l.imageUrls || []),
        ];
        setAllImages(imgs);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchOfferListings();
  }, []);

  // Update all images when listings change
  useEffect(() => {
    if (!loading) {
      const imgs = [
        ...offerListings.flatMap((l) => l.imageUrls || []),
        ...rentListings.flatMap((l) => l.imageUrls || []),
        ...saleListings.flatMap((l) => l.imageUrls || []),
      ];
      setAllImages(imgs);
    }
  }, [offerListings, rentListings, saleListings, loading]);

  // slider functions
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white">
  {/* Main Content */}
  <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 lg:py-24 gap-12">
    
    {/* Left Text */}
    <div className="flex-1 space-y-7 z-10">
      <div className="space-y-1">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
          🏠 #1 Real Estate Platform
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
          Find your next{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            perfect home
          </span>
          <br />
          with ease
        </h1>
      </div>
      <p className="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl">
        Real Estate is the best place to discover your dream property.
        Browse through a wide range of homes for sale and rent — tailored
        to your lifestyle and budget.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/search"
          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg font-bold"
        >
          Get Started
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
        <Link
          to="/about"
          className="inline-flex items-center justify-center bg-white text-slate-700 px-8 py-4 rounded-2xl shadow-md hover:shadow-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200 text-lg font-semibold"
        >
          Learn More
        </Link>
      </div>
    </div>

    {/* Right Lottie Animation */}
    {/* Right Lottie Animation */}
<div className="flex-1 flex justify-center lg:justify-end z-10">
  <div className="relative">
    <DotLottieReact
      src="/src/assets/hero.json"
      loop
      autoplay
      style={{
        width: "600px",   // fixed width
        height: "600px",  // fixed height
      }}
    />
  </div>
</div>

  </div>
</div>


      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Smart Search</h3>
            <p className="text-slate-600">Find properties that match your exact criteria with our advanced filtering system.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Verified Listings</h3>
            <p className="text-slate-600">All properties are thoroughly verified to ensure authenticity and quality.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Expert Support</h3>
            <p className="text-slate-600">Get personalized assistance from our team of real estate professionals.</p>
          </div>
        </div>
      </div>

      {/* Image Slider Section */}
     <div className="relative w-full max-w-6xl mx-auto">
  <div className="relative w-full h-[550px] overflow-hidden rounded-2xl shadow-2xl">
    <div
      className="w-full h-full bg-center bg-cover transition-all duration-700"
      style={{
        backgroundImage: `url(${allImages[currentIndex]})`,
      }}
    ></div>

    {/* Left Button */}
    <button
      onClick={prevSlide}
      className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition z-10"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {/* Right Button */}
    <button
      onClick={nextSlide}
      className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition z-10"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* Dots */}
    <div className="absolute bottom-4 w-full flex justify-center gap-3">
      {allImages.slice(0, 10).map((_, index) => (
        <div
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full cursor-pointer transition-all shadow ${
            currentIndex === index
              ? "bg-white scale-125"
              : "bg-gray-400 hover:bg-white"
          }`}
        ></div>
      ))}
    </div>
  </div>
</div>


      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Listings Section */}
   <div className="w-full p-25 flex flex-col gap-8 my-10">
  {offerListings && offerListings.length > 0 && (
    <div>
      <div className="my-5 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-600">
          Recent offers
        </h2>
       
      </div>
      <div className="flex flex-wrap gap-4">
        {offerListings.map((listing) => (
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  )}

  {rentListings && rentListings.length > 0 && (
    <div>
      <div className="my-3 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-600">
          Recent places for rent
        </h2>
       
      </div>
      <div className="flex flex-wrap gap-4">
        {rentListings.map((listing) => (
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  )}

  {saleListings && saleListings.length > 0 && (
    <div>
      <div className="my-3 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-600">
          Recent places for sale
        </h2>
        <Link
          to="/search?type=sale"
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Show more sales
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {saleListings.map((listing) => (
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  )}
</div>



      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-300 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to find your dream home?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of happy homeowners who found their perfect property through Real Estate.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Start Your Search
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3 className="text-white font-bold text-2xl mb-4">Real Estate</h3>
          <p className="text-lg mb-4">
            Your trusted partner in finding the perfect property.
          </p>
          <p className="text-sm text-slate-400">
            We connect people with their dream homes through innovative
            technology and personalized service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/search"
                className="hover:text-blue-400 transition-colors"
              >
                Search Properties
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About Us
              </Link>
            </li>
           
            <li>
              <Link
                to="/sign-in"
                className="hover:text-blue-400 transition-colors"
              >
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
          <div className="flex gap-4 mb-4">
            <a
              href="#"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <FaFacebookF className="text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-400 transition-colors"
            >
              <FaTwitter className="text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <FaInstagram className="text-lg" />
            </a>
          </div>
          <p className="text-sm text-slate-400">
            Follow us for the latest property updates and tips.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Real Estate. All rights reserved.</p>
      </div>
    </footer>


    </div>
  );
}



    