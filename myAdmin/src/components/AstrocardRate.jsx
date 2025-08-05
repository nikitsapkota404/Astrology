import { useEffect, useState } from 'react';
import axios from 'axios';
import { Award } from 'lucide-react';

const AstroCardRate = () => {
  const [topAstrologers, setTopAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopAstrologers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('http://localhost:5000/api/v1/admin/top-rated');
        if (Array.isArray(res.data)) {
          setTopAstrologers(res.data);
        } else {
          setError('Unexpected data format');
          setTopAstrologers([]);
        }
      } catch (err) {
        setError('Failed to fetch top astrologers');
        setTopAstrologers([]);
        console.error('Error fetching top astrologers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAstrologers();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading top astrologers...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <Award className="mr-2 text-yellow-500" size={24} />
        Top Rated Astrologers
      </h3>
      <ul className="divide-y divide-gray-200">
        {topAstrologers.length === 0 && (
          <li className="py-3 text-center text-gray-600">No astrologers found</li>
        )}
        {topAstrologers.map((astrologer) => (
          <li key={astrologer._id} className="py-3 flex justify-between items-center">
            <span className="text-gray-700">{astrologer.name}</span>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">
                {'⭐'.repeat(Math.round(astrologer.averageRating  || 0))}
              </span>
              <span className="text-gray-500 text-sm">
                ({(astrologer.averageRating || 0).toFixed(1)})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AstroCardRate;
