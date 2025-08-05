import React from "react";
import { FormatDate } from "../../utils/FormatDate";

const JyotishAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div className=" p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
      <div>
        <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          About{" "}
          <span className="text-indigo-600 font-bold text-4xl relative">
            {name}
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-500 opacity-50 rounded-full"></span>
          </span>
        </h3>
        <p className="text-gray-600 mt-6 text-lg leading-relaxed">{about}</p>

        <div className="mt-12 border-t pt-8 border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="mr-2 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 text-sm">📚</span>
            </span>
            Education
          </h3>
          <ul className="mt-6 space-y-8">
            {qualifications?.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center md:gap-6 p-4 bg-white rounded-lg shadow-md border transition-all duration-300 ease-in-out"
              >
                <div>
                  <span className="text-indigo-600 text-sm font-semibold bg-indigo-50 py-1 px-4 rounded-full inline-block mb-3">
                    {FormatDate(item.startingDate)} - {FormatDate(item.endingDate)}
                  </span>
                  <p className="text-lg font-medium text-gray-800">{item.degree}</p>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-2 sm:mt-0 bg-gray-100 py-2 px-4 rounded-md">
                  {item.university}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t pt-8 border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="mr-2 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-500 text-sm">⭐</span>
            </span>
            Experience
          </h3>
          <ul className="grid sm:grid-cols-2 gap-8 pt-6">
            {experiences?.map((item, index) => (
              <li
                key={index}
                className="p-6 bg-yellow-50 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out border border-transparent hover:border-yellow-400"
              >
                <span className="text-yellow-600 text-sm font-semibold bg-yellow-100 py-1 px-4 rounded-full inline-block mb-4">
                  {FormatDate(item.startingDate)} - {FormatDate(item.endingDate)}
                </span>
                <p className="text-lg font-semibold text-gray-800">{item.position}</p>
                <p className="text-sm font-medium text-gray-600 mt-2 flex items-center">
                  <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  {item.office}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JyotishAbout;