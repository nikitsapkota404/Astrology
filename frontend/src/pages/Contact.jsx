import React, { useState } from "react";
import mapImg from "./../assets/images/mapss.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Submit logic goes here
  };

  const handleImageClick = () => {
    window.open("https://www.google.com/maps?q=Vedas+College", "_blank");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-purple-500 px-5 py-10">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 md:p-12 flex flex-col md:flex-row gap-10">
        {/* Left - Location Info & Map */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Our Location</h2>

          <div>
            <p className="text-lg font-medium text-gray-800">Office Location:</p>
            <p className="text-gray-600">Vedas College, Jawalakhel, Lalitpur</p>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800">Phone:</p>
            <p className="text-gray-600">9861908271</p>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800">Email:</p>
            <p className="text-gray-600">nepalastro@gmail.com</p>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-800 mb-2">Find Us on Google Maps:</p>
            <div className="cursor-pointer" onClick={handleImageClick}>
              <img
                src={mapImg}
                alt="Google Map location"
                className="w-full h-64 object-cover rounded-xl shadow-xl transition-all transform hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Contact Us</h2>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-lg font-medium text-gray-800">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-lg font-medium text-gray-800">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-lg font-medium text-gray-800">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message..."
                rows="4"
                className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
