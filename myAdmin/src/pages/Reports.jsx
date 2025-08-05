import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get('http://localhost:5000/api/v1/reviews')
      .then(res => setReviews(res.data.data))
      .catch(err => console.error('Error fetching reviews:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      axios.delete(`http://localhost:5000/api/v1/reviews/680b6f83b6d47832c08e1242`)
        .then(() => {
          setReviews(prev => prev.filter(review => review._id !== id));
        })
        .catch(err => {
          console.error('Failed to delete review:', err);
          alert('Failed to delete review');
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Feedback Report</h1>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Astrologer</th>
              <th className="border p-2 text-left">Review</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="border p-2">{r.user?.name || 'Unknown User'}</td>
                <td className="border p-2">{r.astrologer?.name || 'Unknown Astrologer'}</td>
                <td className="border p-2">{r.reviewText}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
