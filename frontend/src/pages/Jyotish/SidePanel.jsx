import React from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL } from '../../../config';
import { toast } from "react-toastify";

const SidePanel = ({ astrologerId, ticketPrice, timeSlots }) => {
  const bookingHandler = async () => {
    const token = localStorage.getItem("token"); // get latest token dynamically
    if (!token) {
      toast.error("Authentication token missing. Please login.");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${astrologerId}`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        const data = await res.json();
        if (data.message.includes("Token is expired")) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          window.location.href = "/login";
          return;
        }
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment failed. Please try again.");
      }

      if (!data?.sessionURL) {
        throw new Error("No redirect URL found in the response.");
      }

      window.location.href = data.sessionURL;
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border border-[#f3f3f3]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-[#e9ecef]">
        <p className="text-[16px] font-bold text-headingColor">Consultation Fee</p>
        <span className="text-[20px] leading-7 lg:text-[24px] lg:leading-8 text-primaryColor font-bold bg-[#f8f9ff] py-1 px-4 rounded-lg">
          Rs. {ticketPrice}
        </span>
      </div>
      
      <div className="mt-2">
        <p className="text-[16px] font-bold text-headingColor mb-4">
          Available Time Slots
        </p>
        <ul className="mt-3 space-y-3">
          {timeSlots?.map((item, index) => (
            <li 
              key={index} 
              className="flex items-center justify-between py-2 px-4 bg-[#f8f9ff] rounded-lg hover:bg-[#f0f2ff] transition-all duration-300"
            >
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[14px] leading-6 text-textColor font-medium bg-white py-1 px-3 rounded-full shadow-sm">
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      
      <button 
        onClick={bookingHandler} 
        className="btn w-full py-3 mt-8 bg-gradient-to-r from-primaryColor to-[#5874e8] text-white text-[16px] font-bold rounded-xl hover:opacity-90 transition-all duration-300 shadow-md"
      >
        Book Consultation
      </button>
      
      <p className="text-[12px] text-textColor text-center mt-4">
        Secure payment processing • Instant confirmation
      </p>
    </div>
  );
};

export default SidePanel;