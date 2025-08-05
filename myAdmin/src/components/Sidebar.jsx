// components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ You forgot this
import { Home, Users, Star, TrendingUp, Moon,LogOut } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', to: '/dashboard' ,active: false },
  { icon: Users, label: 'Clients', to: '/users',active: false  },
  { icon: Star, label: 'Astrologers ', to: '/astrology', active: false },
  { icon: TrendingUp, label: 'Reports', to: '/reports',active: false  },
];

const Sidebar = () => (
  <div className="w-64 bg-white p-6 shadow-lg rounded-r-xl flex flex-col h-full">
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-blue-600">AstroDash</h1>
    </div>

    <nav className="flex-grow">
      <ul>
        {menuItems.map(({ icon: Icon, label, to, active }) => (
          <li key={label} className="mb-4">
            <Link
              to={to}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                active
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="mr-3" size={20} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <div className="mt-auto">
      <button
  onClick={() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/loginpage"; 
  }}
  className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200"
>
  <LogOut className="mr-3" size={20} />
  Logout
</button>

    </div>
  </div>
);

export default Sidebar;
