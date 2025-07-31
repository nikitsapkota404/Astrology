import React from "react";
import starIcon from "../../assets/images/Star-Icon.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const AstrologerCard = ({ astrologer }) => {
  const {
    name,
    averageRating,
    totalRating,
    photo,
    specialization,
    experiences,
  } = astrologer;

  return (
    <div className="p-4 lg:p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300">
      {/* Image Section */}
      <div className="w-full h-[280px] lg:h-[350px] overflow-hidden rounded-xl">
        <img
          src={photo}
          className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-all duration-300"
          alt={name}
        />
      </div>

      {/* Name Section */}
      <h2 className="text-xl lg:text-2xl font-semibold text-headingColor mt-4 lg:mt-6">
        {name}
      </h2>

      {/* Specialization and Ratings Section */}
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-gradient-to-r from-purple-200 to-purple-300 text-purple-700 py-1 px-4 text-sm lg:text-lg font-medium rounded-full">
          {specialization}
        </span>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-sm lg:text-lg font-semibold text-headingColor">
            <img
              className="w-6 h-6 object-cover"
              src={starIcon}
              alt="Star icon"
            />
            {averageRating}
          </span>
          <span className="text-xs lg:text-sm font-normal text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-4 lg:mt-6 flex items-center justify-between">
        <p className="text-sm lg:text-base font-normal text-textColor">
          At {experiences && experiences[0]?.office}
        </p>

        <Link
          to={`/astrologers/${astrologer._id}`}
          className="w-12 h-12 bg-primaryColor text-white rounded-full flex items-center justify-center border-2 border-transparent hover:bg-secondaryColor group"
        >
          <BsArrowRight className="w-6 h-6 group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
};

export default AstrologerCard;
