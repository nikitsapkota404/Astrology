import React, { useState } from "react";
import axios from "axios";

const Muhurat = () => {
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [muhuratData, setMuhuratData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!dob || !location) {
      alert("Please enter both Date of Birth and Location.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/muhurat", { dob, location });
      setMuhuratData(response.data);
    } catch (error) {
      console.error("Error fetching muhurta:", error.message);
      alert("Failed to fetch muhurta data.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
        📅 Marriage Muhurat Finder
      </h1>

      <div className="space-y-4">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Date of Birth"
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Location"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
        >
          {loading ? "Calculating..." : "Find Muhurat"}
        </button>
      </div>

      {muhuratData && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <h2 className="text-xl font-bold text-indigo-800 text-center mb-4">
            Auspicious Muhurat Dates
          </h2>
          {muhuratData.map((monthData, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-indigo-700">
                {monthData.month}
              </h3>
              {monthData.muhurtas.length > 0 ? (
                <ul className="list-disc list-inside">
                  {monthData.muhurtas.map((muhurat, idx) => (
                    <li key={idx} className="text-gray-700">
                      <strong>{muhurat.date}</strong> ({muhurat.day}):{" "}
                      {muhurat.start_time} - {muhurat.end_time}, Nakshatra:{" "}
                      {muhurat.nakshatra}, Tithi: {muhurat.tithi}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No auspicious dates found.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Muhurat;