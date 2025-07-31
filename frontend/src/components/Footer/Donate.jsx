import React from "react";
import { Link } from "react-router-dom";
import bankQR from "../../assets/images/QR.jpg";  

const Donate = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Support Us with Your Donation
        </h2>
        <p className="text-lg text-gray-600 text-center mb-4">
          Your support helps us improve and expand our astrology services.
          Please donate via the QR code below:
        </p>
        
        <div className="flex justify-center mb-6">
          <img
            src={bankQR}
            alt="Bank QR Code"
            className="w-[200px] h-[200px] object-cover border border-gray-300 rounded-lg"
          />
        </div>

        <p className="text-gray-600 text-center mb-6">
          Simply scan the QR code to make a donation. Your generosity is much appreciated!
        </p>
        
        <div className="flex justify-center">
          <Link
            to="/home"
            className="px-6 py-3 bg-primaryColor text-white rounded-full font-semibold hover:bg-primaryColor/90 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;
