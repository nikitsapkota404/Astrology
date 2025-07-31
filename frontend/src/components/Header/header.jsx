import { useContext, useEffect, useRef, useState, loading } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext.jsx";
import RingLoader from "react-spinners/RingLoader.js";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/astrologers", display: "Find a Jyotish" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, token } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("Sticky__header");
      } else {
        headerRef.current?.classList.remove("Sticky__header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <a href="/">
              <img src={logo} alt="Logo" className="w-[300px] h-auto" />
            </a>
          </div>

          {/* Menu */}
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

                      if (
                        [
                          "/home",
                          "/services",
                          "/astrologers",
                          "/contact",
                        ].includes(link.path)
                      ) {
                        return `${baseStyle} ${
                          isActive
                            ? activeStyle
                            : "hover:bg-purple-100 hover:text-purple-600"
                        }`;
                      }
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Right */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "astrologer"
                      ? "/astrologers/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[40px] h-[40px] rounded-full cursor-pointer">
                    <img
                      src={user?.photo}
                      className="w-full h-full rounded-full object-cover"
                      alt=""
                    />
                  </figure>
                </Link>
              </div>
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
    </header>
  );
};

export default Header;
