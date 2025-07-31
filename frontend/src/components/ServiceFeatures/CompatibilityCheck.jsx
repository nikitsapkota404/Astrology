import React, { useState } from "react";
import {
  Heart,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Star,
  Moon,
  Sun,
} from "lucide-react";

const CompatibilityCheck = () => {
  const [formData, setFormData] = useState({
    person1: {
      name: "",
      birthdate: "",
      birthtime: "",
      birthplace: "",
    },
    person2: {
      name: "",
      birthdate: "",
      birthtime: "",
      birthplace: "",
    },
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (person, field, value) => {
    setFormData({
      ...formData,
      [person]: {
        ...formData[person],
        [field]: value,
      },
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    // Simulating dynamic response with random values based on the user's input
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * (90 - 70 + 1)) + 70; // Random overall score between 70 and 90
      const aspects = {
        romantic: Math.floor(Math.random() * (90 - 70 + 1)) + 70,
        communication: Math.floor(Math.random() * (80 - 60 + 1)) + 60,
        emotional: Math.floor(Math.random() * (90 - 75 + 1)) + 75,
        intellectual: Math.floor(Math.random() * (75 - 60 + 1)) + 60,
        physical: Math.floor(Math.random() * (90 - 75 + 1)) + 75,
      };

      const resultDescription =
        randomScore >= 80
          ? "You share a powerful connection with strong emotional bonds. Your communication could use some work, but your romantic and physical chemistry is excellent. With some effort in intellectual areas, this relationship can flourish."
          : "While your connection is solid, there may be some areas to work on. Communication and emotional understanding could be improved for a better relationship balance.";

      const planetaryConnections = [
        {
          planets: "Venus-Mars",
          aspect: "Trine",
          description: "Strong physical attraction",
        },
        {
          planets: "Sun-Moon",
          aspect: "Sextile",
          description: "Natural emotional understanding",
        },
        {
          planets: "Mercury-Jupiter",
          aspect: "Square",
          description: "Communication challenges",
        },
      ];

      setResult({
        overallScore: randomScore,
        aspects,
        description: resultDescription,
        planetaryConnections,
      });
      setLoading(false);
    }, 2000);
  };

  const renderScoreBar = (score) => {
    return (
      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-50 via-indigo-100 to-purple-50 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
          <Heart className="mr-3 text-pink-500" />
          Love Compatibility
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Discover your astrological connection through synastry and composite
          charts
        </p>
      </div>

      {!result ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Person 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 text-purple-700">
                Person 1
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person1.name}
                    onChange={(e) =>
                      handleChange("person1", "name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Birth Date
                  </label>
                  <input
                    type="date"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person1.birthdate}
                    onChange={(e) =>
                      handleChange("person1", "birthdate", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Birth Time
                  </label>
                  <input
                    type="time"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person1.birthtime}
                    onChange={(e) =>
                      handleChange("person1", "birthtime", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Birth Place
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person1.birthplace}
                    onChange={(e) =>
                      handleChange("person1", "birthplace", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Person 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-4 text-purple-700">
                Person 2
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person2.name}
                    onChange={(e) =>
                      handleChange("person2", "name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Birth Date
                  </label>
                  <input
                    type="date"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person2.birthdate}
                    onChange={(e) =>
                      handleChange("person2", "birthdate", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Birth Time
                  </label>
                  <input
                    type="time"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person2.birthtime}
                    onChange={(e) =>
                      handleChange("person2", "birthtime", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Birth Place
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.person2.birthplace}
                    onChange={(e) =>
                      handleChange("person2", "birthplace", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-6 w-6 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12h16"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Check Compatibility"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Results Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
              Compatibility Results
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-indigo-700">
                  {result.overallScore}% Compatibility
                </h3>
                <p className="text-lg text-gray-600 mt-2">
                  {result.description}
                </p>
              </div>

              {/* Compatibility Aspects */}
              <div>
                <h4 className="text-lg font-semibold text-indigo-600 mb-4">
                  Compatibility Aspects
                </h4>
                <div className="space-y-3">
                  {Object.entries(result.aspects).map(([aspect, score]) => (
                    <div
                      key={aspect}
                      className="flex items-center justify-between"
                    >
                      <span className="text-lg font-medium text-gray-700">
                        {aspect.charAt(0).toUpperCase() + aspect.slice(1)}
                      </span>
                      <div className="w-1/2">{renderScoreBar(score)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planetary Connections */}
              <div>
                <h4 className="text-lg font-semibold text-indigo-600 mb-4">
                  Planetary Connections
                </h4>
                <div className="space-y-3">
                  {result.planetaryConnections.map((connection, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-600">
                        {connection.planets}
                      </span>
                      <span className="font-medium text-indigo-600">
                        {connection.aspect}
                      </span>
                      <span className="text-gray-600">
                        {connection.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setResult(null)}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition duration-300"
            >
              Check Another Compatibility
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompatibilityCheck;
