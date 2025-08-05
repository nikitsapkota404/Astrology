import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ item }) => {
  const { name, desc, link } = item;  // Destructure 'link' from the service data

  return (
    <div className="rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-[0_10px_15px_rgba(255,255,255,0.6)] transition duration-300 border border-gray-100 hover:border-transparent group">
      <h2 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-primaryColor transition">
        {name}
      </h2>

      <p className="text-base lg:text-[17px] text-white mt-4 leading-relaxed">
        {desc}
      </p>

      <div className="mt-6 flex justify-end">
        <Link
          to={link}  // Dynamically link to the corresponding service page
          className="px-5 py-2.5 rounded-full  text-white font-medium hover:bg-primaryColor/90 transition shadow border border-gray-100"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;