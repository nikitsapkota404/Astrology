import React from "react";
import heroImg01 from "../assets/images/astro1.jpg";
import heroImg02 from "../assets/images/mulla.jpg";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import {
  FaceSmileIcon,
  UserGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import About from "../components/About/About";
import ServiceList from "../components/services/serviceList";
import featureImg from "../assets/images/nikiy.jpg";
import chatIcon from "../assets/images/bubble-chat.png";
import avatarIcon from "../assets/images/nikiy.jpg";
import AstrologerList from "../components/Astologers/AstrologerList";
import faqImg from "../assets/images/faq-img.jpg";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      {/* herosec */}
      <section className="hero_section pt-[60px] 2xl:h-[800px] bg-gradient-to-b from-purple-200 to-transparent">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* herocontent */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px] bg-clip-text text-transparent bg-blue-900">
                  We are here to serve you your own destiny.
                </h1>
                <p className="text__para mt-8">
                  “Our astrological services are so good, you'll find yourself
                  saying ‘Wow, I actually loved that!’ 😂 You might even be
                  surprised to know — this entire website was built by someone
                  who grew up wild, free, and full of chaos... but look at us
                  now! 🌟”
                </p>
                <Link to="/astrologers">
                <button className="btn mt-8 shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                  Book Appointment
                </button>
                </Link>
                <Link to="/services">
                  <button className="btn mt-8 ml-10 shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                    See Astrological Services
                  </button>
                </Link>
              </div>

              {/* hero counter */}
              <div className="mt-[10px] lg:mt-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Astrologers */}
                <div className="p-8 bg-gradient-to-br from-purple-100 to-white border border-purple-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                  <UserGroupIcon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <h2 className="text-[36px] font-bold text-purple-700">
                    200+
                  </h2>
                  <p className="text-gray-600 font-medium">
                    Expert Astrologers
                  </p>
                </div>

                {/* Experience */}
                <div className="p-8 bg-gradient-to-br from-yellow-100 to-white border border-yellow-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                  <CalendarDaysIcon className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                  <h2 className="text-[36px] font-bold text-yellow-600">
                    20+ Years
                  </h2>
                  <p className="text-gray-600 font-medium">
                    Experience in the field
                  </p>
                </div>

                {/* Satisfaction */}
                <div className="p-8 bg-gradient-to-br from-green-100 to-white border border-green-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                  <FaceSmileIcon className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <h2 className="text-[36px] font-bold text-green-600">100%</h2>
                  <p className="text-gray-600 font-medium">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* herocontent */}
            <div className="flex gap-[30px] justify-end">
              <div className="w-[200px] md:w-[250px] lg:w-[300px] transform -rotate-3 transition-transform duration-300 hover:rotate-0">
                <img
                  className="w-full h-auto object-cover rounded-2xl shadow-xl"
                  src={heroImg01}
                  alt=""
                />
              </div>

              <div className="mt-[30px] w-[200px] md:w-[250px] lg:w-[300px] transform rotate-3 transition-transform duration-300 hover:rotate-0">
                <img
                  src={heroImg02}
                  alt=""
                  className="w-full h-auto object-cover mb-[30px] rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* herosec end */}
      <section className="py-16 mt-5 bg-indigo-50">
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center relative">
              <span className="relative z-10">Providing best astrology</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-200 opacity-40 z-0"></span>
            </h2>
            <p className="text__para text-center mt-4">
              World class astrological services. Our system provides unmatched,
              expert based astrological services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center">
                <img
                  src={icon01}
                  alt=""
                  className="w-[260px] h-[172px] object-contain"
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a astrologer
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400px] mt-4 text-center">
                  World class astrological services. Our system provides
                  unmatched, expert based astrological services.
                </p>
                <Link
                  to="/astrologers"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none transition-all duration-300"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5 transition-all duration-300" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center">
                <img
                  src={icon02}
                  alt=""
                  className="w-[260px] h-[172px] object-contain"
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find Location
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400px] mt-4 text-center">
                  World class astrological services. Our system provides
                  unmatched, expert based astrological services.
                </p>
                <Link
                  to="https://www.google.com/maps?q=Vedas+College"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none transition-all duration-300"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5 transition-all duration-300" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-center">
                <img
                  src={icon03}
                  alt=""
                  className="w-[260px] h-[172px] object-contain"
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400px] mt-4 text-center">
                  World class astrological services. Our system provides
                  unmatched, expert based astrological services.
                </p>
                <Link
                  to="/astrologers"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none transition-all duration-300"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5 transition-all duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />

      {/* services */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container">
          <div className="xl:w-[550px] mx-auto">
            <h2 className="heading text-center relative">
              <span className="relative z-10">Our Astrological Services</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-200 opacity-40 z-0"></span>
            </h2>
            <p className="text__para text-center mt-4">
              World class astrological services. Our system provides unmatched,
              expert based astrological services.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* services end */}

      {/* features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            <div className="xl:w-[670px]">
              <h2 className="heading relative">
                <span className="relative z-10">
                  Get Virtual Service <br />
                  anytime.
                </span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-200 opacity-40 z-0"></span>
              </h2>
              <ul className="pl-4 mt-8">
                <li className="text__para mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-bold">
                    1
                  </span>
                  Schedule the Appointment Directly.
                </li>
                <li className="text__para mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-bold">
                    2
                  </span>
                  Search for your astrologer and contact their office.
                </li>
                <li className="text__para mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-bold">
                    3
                  </span>
                  View your astrologers who are accepting new members, use an
                  online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/astrologers">
                <button className="btn mt-6 shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                  Start now
                </button>
              </Link>
            </div>

            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img
                src={featureImg}
                alt=""
                className="w-[250px] md:w-[300px] lg:w-[350px] mx-auto rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105"
              />

              <div className="w-[150px] lg:w-[250px] bg-indigo-50 absolute bottom-[40px] left-0 md:bottom-[20px] md:left-64 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px] shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Sunday, 25
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      11:00 PM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={chatIcon} alt="" />
                  </span>
                </div>
                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Appointment
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img
                    src={avatarIcon}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                  />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Nikit Sapkota
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Great astrologers */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="xl:w-[550px] mx-auto">
            <h2 className="heading text-center relative">
              <span className="relative z-10">Our Great Astrologers</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-200 opacity-40 z-0"></span>
            </h2>
            <p className="text__para text-center mt-4">
              We provide world-renowned astrology services powered by expert
              knowledge and innovative technology.
            </p>
          </div>
          <AstrologerList />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      
      {/* Image Section */}
      <div className="hidden md:block lg:w-5/12">
        <img
          className="w-full h-auto rounded-3xl shadow-xl object-cover transition duration-500 transform hover:scale-105"
          src={faqImg}
          alt="FAQ Illustration"
        />
      </div>

      {/* FAQ Section */}
      <div className="w-full lg:w-7/12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            <span className="relative z-10 text-gray-900">
              Most questions asked by our clients
            </span>
            <span className="absolute left-0 bottom-1 h-3 w-full bg-purple-200 rounded-md opacity-50 -z-10"></span>
          </h2>
        </div>
        <FaqList />
      </div>

    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container">
          <div className="xl:w-[550px] mx-auto">
            <h2 className="heading text-center relative">
              <span className="relative z-10">What our clients say</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-200 opacity-40 z-0"></span>
            </h2>
            <p className="text__para text-center mt-4">
              We provide world-renowned astrology services powered by expert
              knowledge and innovative technology.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};
export default Home;
