import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Mail,
  Phone,
  Copy,
  Calendar,
  Briefcase,
  Clock,
  MapPin,
} from 'lucide-react';

const astrologerProfile = {
  name: 'Cameron Williamson',
  avatar: 'https://placehold.co/120x120/E5E7EB/4B5563?text=CW',
  details: [
    { icon: <Calendar size={20} />, label: 'Joined: May 2023' },
    { icon: <Briefcase size={20} />, label: 'Tarot Reading' },
    { icon: <Clock size={20} />, label: 'Available Now' },
    { icon: <MapPin size={20} />, label: 'Kathmandu, Nepal' },
  ],
  contact: {
    email: 'jugalator@mac.com',
    phone: '+380 93 44 33 65',
  },
  businessDescription:
    'We are a creative agency specializing in digital solutions, where innovation meets design to transform ideas into captivating experiences...',
};

const ProfilePage = () => {
  const navigate = useNavigate(); // ✅ Correct hook usage

  const handleAccept = () => {
    console.log(`Accepted request for ${astrologerProfile.name}`);
  };

  const handleReject = () => {
    console.log(`Rejected request for ${astrologerProfile.name}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log(`Copied "${text}" to clipboard!`);
    }).catch((err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 font-inter flex justify-center items-start overflow-auto">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        {/* Header */}
        <div className="p-4 flex items-center">
          <button
            className="p-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={() => navigate('/astrology')}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-semibold">User Profile</h1>
        </div>

        {/* Profile Card Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-gray-200">
          <img
            src={astrologerProfile.avatar}
            alt={astrologerProfile.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="grid grid-cols-1 gap-2 mt-2">
                {astrologerProfile.details.map((item, index) => (
                  <div key={index} className="flex items-center text-gray-600 text-sm">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Contacts:</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-gray-600">
            <div className="flex items-center">
              <Mail size={18} className="text-gray-400" />
              <span className="ml-2 mr-2">{astrologerProfile.contact.email}</span>
              <button
                onClick={() => copyToClipboard(astrologerProfile.contact.email)}
                className="p-1 text-gray-400 hover:bg-gray-100 rounded-full"
                title="Copy Email"
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="flex items-center">
              <Phone size={18} className="text-gray-400" />
              <span className="ml-2 mr-2">{astrologerProfile.contact.phone}</span>
              <button
                onClick={() => copyToClipboard(astrologerProfile.contact.phone)}
                className="p-1 text-gray-400 hover:bg-gray-100 rounded-full"
                title="Copy Phone Number"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Business Description Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Description:</h3>
          <p className="text-gray-600 text-sm">
            {astrologerProfile.businessDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
