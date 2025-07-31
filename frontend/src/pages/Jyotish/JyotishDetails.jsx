import { useState } from "react";
import star from "./../../assets/images/Star-Icon.png";
import JyotishAbout from "./JyotishAbout";
import Feedback from "./feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";

const JyotishDetails = () => {
  const { id } = useParams();
  const {
    data: astrologer,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/astrologers/${id}`);

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = astrologer;

  const [tab, setTab] = useState("about");
  
  return (
    <section className="py-10 bg-gradient-to-b from-[#f8f9ff] to-white">
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#f5f5f5]">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img 
                    src={photo} 
                    alt={name} 
                    className="w-full h-full object-cover rounded-xl shadow-md border-4 border-white"
                  />
                </figure>
                <div className="mt-3 md:mt-0 text-center md:text-left">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-gradient-to-r from-[#CCF0F3] to-[#e6f8fa] text-irisBlueColor py-2 px-6 text-[15px] leading-5-7 font-semibold rounded-full shadow-sm">
                      {specialization}
                    </span>
                  </div>
                  <h3 className="text-headingColor text-[24px] md:text-[28px] leading-9 mt-4 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px] mt-2 justify-center md:justify-start">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 font-semibold text-headingColor bg-[#fff8e8] py-1 px-3 rounded-full">
                      <img
                        className="w-[20px] h-[20px] object-cover"
                        src={star}
                        alt="rating"
                      />
                      {averageRating}
                      <span className="text-[14px] leading-5 font-[400] text-textColor">
                        ({totalRating})
                      </span>
                    </span>
                  </div>
                  <p className="text-[14px] leading-6 md:text-[16px] mt-4 text-gray-600 max-w-[95%] mx-auto md:mx-0">
                    {bio}
                  </p>
                </div>
              </div>
              
              <div className="mt-[50px] border-b border-solid border-[#0066FF34] flex justify-center md:justify-start">
                <button
                  onClick={() => setTab("about")}
                  className={`py-3 px-8 mr-5 text-[16px] leading-7 text-headingColor font-semibold transition-all duration-300 hover:text-primaryColor ${
                    tab === "about"
                      ? "border-b-2 border-solid border-primaryColor text-primaryColor"
                      : ""
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`py-3 px-8 mr-5 text-[16px] leading-7 text-headingColor font-semibold transition-all duration-300 hover:text-primaryColor ${
                    tab === "feedback"
                      ? "border-b-2 border-solid border-primaryColor text-primaryColor"
                      : ""
                  }`}
                >
                  Feedback
                </button>
              </div>
              
              <div className="mt-[50px] bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#f5f5f5]">
                {tab === "about" && <JyotishAbout name={name} about={about} qualifications={qualifications} experiences={experiences} />}
                {tab === "feedback" && <Feedback reviews={reviews} totalRating={totalRating} />}
              </div>
            </div>
            
            <div className="mt-8 md:mt-0">
              <div className="sticky top-28">
                <SidePanel 
                  astrologerId={astrologer._id} 
                  ticketPrice={ticketPrice} 
                  timeSlots={timeSlots} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JyotishDetails;