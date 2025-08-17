import React from "react";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiOutlineFacebook,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    path: "https://www.facebook.com/nikit.sapkota",
    icon: <AiOutlineFacebook className="w-6 h-6 group-hover:text-white" />,
  },
  {
    path: "https://github.com/nikitsapkota404",
    icon: <AiFillGithub className="w-6 h-6 group-hover:text-white" />,
  },
  {
    path: "https://www.instagram.com/nikitsapkota/",
    icon: <AiOutlineInstagram className="w-6 h-6 group-hover:text-white" />,
  },
  {
    path: "https://www.linkedin.com/in/nikit-sapkota-b81ab8359/",
    icon: <RiLinkedinFill className="w-6 h-6 group-hover:text-white" />,
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About Us" },
  { path: "/services", display: "Services" },
  { path: "/", display: "Blog" },
];

const quickLinks02 = [
  { path: "/astrologers", display: "Find an Astrologer" },
  { path: "/astrologers", display: "Request an Appointment" },
  { path: "https://www.google.com/maps?q=Vedas+College", display: "Find Location" },
  { path: "/contact", display: "Get Opinion" },
];

const quickLinks03 = [
  { path: "/donate", display: "Donate" },
  { path: "/contact", display: "Contact Us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className=" text-white py-12 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Social */}
          <div>
            <img src={logo} alt="Logo" className="w-[300px] mb-4 ml-[-30px]" />
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-800 transition"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-4 text-base">
              {quickLinks01.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="hover:text-purple-600 transition"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* I want to */}
          <div>
            <h3 className="text-xl font-semibold mb-5">I want to:</h3>
            <ul className="space-y-4 text-base">
              {quickLinks02.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="hover:text-purple-600 transition"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Support</h3>
            <ul className="space-y-4 text-base">
              {quickLinks03.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="hover:text-purple-600 transition"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-300 pt-6 text-center text-lg">
        &copy; {year} Developed by Nikit. All rights reserved.
         <p> Made with ❤️ by Nikit Sapkota</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
