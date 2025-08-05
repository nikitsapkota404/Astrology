import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/astrologo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext.jsx";
import RingLoader from "react-spinners/RingLoader.js";


// ✅ Define navLinks
const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/astrologers", display: "Find a Jyotish" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user, role, token, loading } = useContext(AuthContext); // included loading from context

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
<header
  ref={headerRef}
  className={`relative w-screen flex flex-col items-center gap-[0.3em] transition-all duration-300 ease-in-out px-[5em] ${
    isSticky ? "h-[12vh] w-screen" : "h-[25vh] w-screen"
  } py-[0.5em]`}
  style={{ boxShadow: "0 1px 1px rgba(255, 255, 255, 0.2)" }}
>

      {/* Top Header (hidden on scroll) */}
      <div
        className={`topheader text-white h-[40%] w-[100%]  ${
          isSticky ? "hidden" : "flex"
        } justify-between mx-[4em] items-center px-[1em] transition-all duration-300`}
      >
        <div className="contact">
          <span className="text-white">
            <p>contact@gmail.com</p>
            <p>+977-9865413223</p>
          </span>
        </div>

        {/* User/Login */}
        <div className="login_userprofile">
          <div className="flex items-center gap-4">
            {token && user ? (
              <Link
                to={
                  role === "astrologer"
                    ? "/astrologers/profile/me"
                    : "/users/profile/me"
                }
              >
                <figure className="w-[40px] h-[40px] rounded-full cursor-pointer">
                  <img
                    src={user?.photo}
                    className="w-full h-full rounded-full object-cover"
                    alt="Profile"
                  />
                </figure>
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    {loading ? (
                      <RingLoader size={30} color="#facc15" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    {loading ? (
                      <RingLoader size={30} color="#facc15" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Header (sticky on scroll) */}
      <div
        className={`bottomheader text-white h-[55%] flex justify-between  items-center px-[0.5em] w-[100%] transition-all duration-300   ${
          isSticky
            ? "fixed max-h-[12vh] top-0 right-0  z-50 shadow-md w-[100%] px-[6em] backdrop-blur-lg "
            : ""
        }`}
      >
        {/* Logo */}
        <div className="logo h-[30vh] w-[200px]  relative">
          <a href="/">
            <img src={logo} alt="Logo" className="w-full h-full" />
          </a>
        </div>

        {/* Navigation Menu */}
        <div
          className={`navigation ${isMenuOpen ? "block" : "hidden"} md:block`}
        >
          
          <ul className="menu flex flex-col md:flex-row items-center gap-[2.7rem]">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => {
                    const baseStyle =
                      "text-[16px] leading-7 font-[500] px-4 py-2 rounded-full transition-all duration-200";
                    const activeStyle =
                      "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-[600] shadow-lg";

                    return `${baseStyle} ${
                      isActive
                        ? activeStyle
                        : "hover:bg-purple-100 hover:text-purple-600"
                    }`;
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;