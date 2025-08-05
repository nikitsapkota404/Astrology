import React, { useEffect, useState } from "react";
import { ADMIN_BASE_URL } from "../../config.js";
import { FaTrash } from "react-icons/fa";

const Astrologers = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAstrologers = async () => {
    try {
      const res = await fetch(`${ADMIN_BASE_URL}/admin/astrologers`);
      if (!res.ok) throw new Error("Failed to fetch astrologers");
      const data = await res.json();
      setAstrologers(data);
    } catch (error) {
      console.error("Error fetching astrologers:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAstrologer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this astrologer?")) return;
    try {
      const res = await fetch(`${ADMIN_BASE_URL}/admin/astrologers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete astrologer");
      setAstrologers(astrologers.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error deleting astrologer:", error);
    }
  };

  const approveAstrologer = async (id) => {
    try {
      const res = await fetch(`${ADMIN_BASE_URL}/admin/astrologers/${id}/approve`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to approve astrologer");
      setAstrologers(
        astrologers.map((a) => (a._id === id ? { ...a, isApproved: "approved" } : a))
      );
    } catch (error) {
      console.error("Error approving astrologer:", error);
    }
  };
   const filteredUsers = astrologers.filter((astrologer) =>
    astrologer.name.toLowerCase().includes(search.toLowerCase()) ||
    astrologer.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchAstrologers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading astrologers...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Astrologers</h1>
       <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border">Photo</th>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Phone</th>
              <th className="py-3 px-4 border">Specialization</th>
              <th className="py-3 px-4 border">Rating</th>
              <th className="py-3 px-4 border">Approved</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">
                    <img
                      src={a.photo || "/default-avatar.png"}
                      alt={a.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border">{a.name}</td>
                  <td className="py-2 px-4 border">{a.email}</td>
                  <td className="py-2 px-4 border">{a.phone || "N/A"}</td>
                  <td className="py-2 px-4 border">{a.specialization || "N/A"}</td>
                  <td className="py-2 px-4 border">{a.averageRating ?? "N/A"}</td>
                  <td className="py-2 px-4 border">{a.isApproved || "Pending"}</td>
                  <td className="py-2 px-4 border text-center space-x-2">
                    {a.isApproved !== "approved" && (
                      <button
                        onClick={() => approveAstrologer(a._id)}
                        className="text-green-600 hover:text-green-800 mr-2"
                        title="Approve Astrologer"
                      >
                        ✅ Approve
                      </button>
                    )}
                    <button
                      onClick={() => deleteAstrologer(a._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Astrologer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No astrologers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Astrologers;
