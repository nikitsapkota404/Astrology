// KundaliMatching.jsx
import React, { useState } from 'react';

const KundaliMatching = () => {
  const [boy, setBoy] = useState({ date: '', time: '', lat: '', lon: '' });
  const [girl, setGirl] = useState({ date: '', time: '', lat: '', lon: '' });
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e, setPerson) => {
    const { name, value } = e.target;
    setPerson(prev => ({ ...prev, [name]: value }));
  };

  const matchKundali = async () => {
    setLoading(true);
    try {
      const boyDT = `${boy.date}T${boy.time}`;
      const girlDT = `${girl.date}T${girl.time}`;

      const res = await fetch(
        `https://api.prokerala.com/v2/astrology/match-making?boy_dob=${boyDT}&boy_lat=${boy.lat}&boy_lng=${boy.lon}&girl_dob=${girlDT}&girl_lat=${girl.lat}&girl_lng=${girl.lon}`,
        {
          headers: {
            Authorization: 'Bearer YOUR_ACCESS_TOKEN',
          },
        }
      );
      const data = await res.json();
      setMatchData(data);
    } catch (err) {
      console.error('Error fetching match:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧿 Kundali Matching (Matchmaking)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold">👦 Boy's Details</h3>
          <input name="date" type="date" className="border p-2 w-full mb-2" onChange={(e) => handleInput(e, setBoy)} />
          <input name="time" type="time" className="border p-2 w-full mb-2" onChange={(e) => handleInput(e, setBoy)} />
          <input name="lat" placeholder="Latitude" className="border p-2 w-full mb-2" onChange={(e) => handleInput(e, setBoy)} />
          <input name="lon" placeholder="Longitude" className="border p-2 w-full" onChange={(e) => handleInput(e, setBoy)} />
        </div>

        <div>
          <h3 className="font-semibold">👧 Girl's Details</h3>
          <input name="date" type="date" className="border p-2 w-full mb-2" onChange={(e) => handleInput(e, setGirl)} />
          <input name="time" type="time" className="border p-2 w-full mb-2" onChange={(e) => handleInput(e, setGirl)} />
          <input name="lat" placeholder="Latitude" className="border p-2 w-full mb-2" onChange={(e) => handleInput(e, setGirl)} />
          <input name="lon" placeholder="Longitude" className="border p-2 w-full" onChange={(e) => handleInput(e, setGirl)} />
        </div>
      </div>

      <button
        onClick={matchKundali}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Checking...' : 'Check Compatibility'}
      </button>

      {matchData && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold text-lg mb-2">💖 Match Results</h3>
          <p><strong>Total Points:</strong> {matchData.data.total_points}/36</p>
          <p><strong>Compatibility:</strong> {matchData.data?.compatibility_report?.match_report}</p>

          <h4 className="font-semibold mt-4 mb-2">🔍 Ashtakoota Details:</h4>
          <ul className="list-disc ml-5">
            {matchData.data.ashtakoota.map((item, index) => (
              <li key={index}>
                {item.koota} - Score: {item.obtained_points}/{item.total_points}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KundaliMatching;