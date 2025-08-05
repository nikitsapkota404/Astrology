// HoroscopeReading.jsx
import React, { useState } from 'react';

const HoroscopeReading = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    latitude: '',
    longitude: '',
  });
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchHoroscopeReading = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.prokerala.com/v2/astrology/birth-details?datetime=${formData.date}T${formData.time}&latitude=${formData.latitude}&longitude=${formData.longitude}`,
        {
          headers: {
            Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          },
        }
      );
      const data = await res.json();
      setReading(data);
    } catch (error) {
      console.error('Error fetching horoscope:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🔮 Horoscope Reading</h2>
      <div className="flex flex-col gap-4 max-w-md">
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="border p-2"
        />

        <button
          onClick={fetchHoroscopeReading}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Loading...' : 'Get Reading'}
        </button>
      </div>

      {reading && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold text-lg">Your Personality Insight</h3>
          <p className="mt-2">{reading?.data?.summary}</p>
          {/* You can display more info here like planets, ascendant, etc. */}
        </div>
      )}
    </div>
  );
};

export default HoroscopeReading;