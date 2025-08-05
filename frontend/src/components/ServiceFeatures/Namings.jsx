// Namings.jsx
import React, { useState } from 'react';

const Namings = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    latitude: '',
    longitude: '',
  });
  const [nakshatraData, setNakshatraData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getNamingSuggestion = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.prokerala.com/v2/astrology/baby-naming?datetime=${formData.date}T${formData.time}&latitude=${formData.latitude}&longitude=${formData.longitude}`,
        {
          headers: {
            Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          },
        }
      );
      const data = await res.json();
      setNakshatraData(data);
    } catch (err) {
      console.error('API error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">👶 Child Birth & Naming Astrology</h2>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="time"
          name="time"
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
          onClick={getNamingSuggestion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Fetching...' : 'Get Name Suggestions'}
        </button>
      </div>

      {nakshatraData && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">📜 Naming Guidance</h3>
          <p><strong>Nakshatra:</strong> {nakshatraData?.data?.nakshatra?.name}</p>
          <p><strong>Rashi:</strong> {nakshatraData?.data?.rasi?.name}</p>
          <p><strong>Syllables:</strong> {nakshatraData?.data?.syllables?.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default Namings;