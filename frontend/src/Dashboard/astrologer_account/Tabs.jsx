import React, { useState, useEffect, useRef, useContext } from "react";
import axios from 'axios'
import { token } from "../../../config";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../../config";

const Tabs = ({ tab, setTab }) => {

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout =()=>{
        dispatch({type:'LOGOUT'})
        navigate('/')
    }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'settings', label: 'Profile' }
  ];
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
const handleDeleteAccount = async () => {
  if (!token) {
    alert("You need to be logged in as an astrologer to delete your account.");
    return;
  }

  try {
    const res = await axios.delete(`${BASE_URL}/astrologers/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200 || res.status === 204) {
      alert("Astrologer account deleted successfully.");
      // Clear the token and logout
      localStorage.removeItem("token");
      // Do the logout and redirect
      dispatch({ type: "LOGOUT" });
      navigate("/");  // Redirect to homepage or login page
    } else {
      alert("Failed to delete astrologer account.");
    }
  } catch (err) {
    console.error("Error deleting astrologer account:", err);
    alert("Something went wrong while deleting your astrologer account.");
  }
};
  
  return (
    <div className="relative" ref={menuRef}>
      {/* Mobile Menu Button */}
      <div 
        className="lg:hidden flex items-center p-3 rounded-lg shadow-sm bg-white mb-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <BiMenu className="w-6 h-6 cursor-pointer" />
        <span className="ml-2 font-medium">{tabs.find(t => t.id === tab)?.label || 'Menu'}</span>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute z-10 w-full bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setIsMenuOpen(false);
              }}
              className={`
                w-full py-3 px-4 text-left transition-colors
                ${tab === item.id 
                  ? "bg-indigo-100 text-primaryColor font-medium" 
                  : "hover:bg-gray-50 text-headingColor"}
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-col p-6 bg-white shadow-panelShadow rounded-md">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`
              w-[250px] h-[50px] mt-0 mb-2 rounded-md transition-all duration-300 font-medium
              ${tab === item.id
                ? "bg-indigo-100 text-red-500 border-l-8 border-purple-800"
                : " text-headingColor"}
            `}
          >
            {item.label}
          </button>
          
        ))}
         <div className="mt-[100px] w-full"> 
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 p-3 text-[16px] leading-7 rounded-md text-white"
            >
              Logout
            </button>
            <button onClick={handleDeleteAccount} className="w-full bg-red-500 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
              Delete Account
            </button>
          </div>
      </div>
    </div>
  );
};

export default Tabs;
