import React from 'react';
import { useState } from 'react';
import {Bell, MessageSquare } from 'lucide-react';


 

const Header = () => {

  // Dummy data for the astrologer cards
  const astrologers = [
    { name: "Astrologer Name 1", specialty: "Specialty 1" },
    { name: "Astrologer Name 2", specialty: "Specialty 2" },
  ]; return(
 <div className="w-[96%] p-4 md:p-2 lg:p-2 font-sans text-gray-800">

      {/* Header Section - Updated to match the new design */}
      <header className="flex items-center justify-end gap-4 p-4  rounded-xl ">
        {/* Icons and User Profile */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Notification Bell Icon */}
          <div className="relative cursor-pointer">
            <Bell className="h-6 w-6 text-gray-500" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </div>
          {/* Chat Message Icon */}
          <div className="relative cursor-pointer">
            <MessageSquare className="h-6 w-6 text-gray-500" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </div>
          {/* User Profile Picture */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-blue-400 shadow-md cursor-pointer">
            <img
              src="https://placehold.co/100x100/A0A0A0/FFFFFF?text=admin"
              alt="User Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </header>
      
    </div>
)};

export default Header;