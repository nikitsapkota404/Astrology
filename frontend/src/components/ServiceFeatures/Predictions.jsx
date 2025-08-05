import React, { useState } from 'react';

const Predictions = () => {
  const [sign, setSign] = useState('');
  const [day, setDay] = useState('today');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPrediction = async () => {
    if (!sign || !day) {
      setError("Please select both sign and day.");
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`, {
        method: 'POST'
      });

      if (!res.ok) {
        throw new Error("API Error");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch prediction. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-6 py-10 text-center">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        🌙 Daily, Weekly & Monthly Predictions
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <select
          value={sign}
          onChange={(e) => setSign(e.target.value)}
          className="px-4 py-2 rounded border border-purple-300"
        >
          <option value="">Select Zodiac Sign</option>
          {[
            "aries", "taurus", "gemini", "cancer", "leo", "virgo",
            "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
          ].map(s => (
            <option key={s} value={s}>{s.toUpperCase()}</option>
          ))}
        </select>

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-4 py-2 rounded border border-purple-300"
        >
          <option value="today">Daily</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="yesterday">Yesterday</option>
        </select>

        <button
          onClick={fetchPrediction}
          className="bg-purple-600 text-white font-semibold px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Get Prediction
        </button>
      </div>

      {loading && <p className="text-purple-600">Loading prediction...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="max-w-md mx-auto bg-white rounded shadow-md p-6 text-left">
          <h3 className="text-xl font-bold text-purple-700 mb-2">
            {sign.toUpperCase()} - {day.toUpperCase()}
          </h3>
          <p><strong>Date Range:</strong> {data.date_range}</p>
          <p><strong>Current Date:</strong> {data.current_date}</p>
          <p><strong>Description:</strong> {data.description}</p>
          <p><strong>Compatibility:</strong> {data.compatibility}</p>
          <p><strong>Mood:</strong> {data.mood}</p>
          <p><strong>Color:</strong> {data.color}</p>
          <p><strong>Lucky Number:</strong> {data.lucky_number}</p>
          <p><strong>Lucky Time:</strong> {data.lucky_time}</p>
        </div>
      )}
    </div>
  );
};

export default Predictions;