import React from "react";
import { FaUsers, FaHandshake, FaHome, FaPhone } from "react-icons/fa";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">About Us</h1>
        <p className="text-lg lg:text-xl max-w-2xl mx-auto">
          We connect people with their dream homes through trust, innovation, and dedication.
        </p>
      </section>

      {/* Company Intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-20 py-16 flex flex-col lg:flex-row items-center gap-12">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Company"
          className="rounded-2xl shadow-lg w-full lg:w-1/2"
        />
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            Our real estate platform is designed to make property buying, selling, and renting
            as simple as possible. We provide verified listings, secure deals, and expert
            guidance every step of the way.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To simplify real estate transactions by offering a secure, transparent, and user-friendly platform where everyone can find their dream property.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted real estate marketplace, transforming how people connect with homes and properties globally.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 lg:px-20 py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <FaHome className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
            <p className="text-gray-600">We list only verified properties for a safe and reliable experience.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <FaHandshake className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Deals</h3>
            <p className="text-gray-600">We ensure transparency and trust in every transaction.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600">Our team of experts is here to guide you throughout the process.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {["Ali Khan", "Sara Ahmed", "John Doe"].map((name, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <img
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 20}.jpg`}
                  alt={name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-600"
                />
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-600">Real Estate Agent</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
        <p className="mb-6">Get in touch with us today and make your dream a reality.</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center gap-2 mx-auto">
          <FaPhone /> Contact Us
        </button>
      </section>
    </div>
  );
}
