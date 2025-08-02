import React, { useEffect, useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloud";
import { BASE_URL } from "../../../config";  // only import BASE_URL here
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
    gender: "",
    rashi: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      rashi: user.rashi,
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // get fresh token here

      if (!token) {
        toast.error("Authentication token missing. Please login.");
        setLoading(false);
        window.location.href = "/login";
        return;
      }

      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        const errorData = await res.json();
        if (errorData.message && errorData.message.toLowerCase().includes("token is expired")) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          setLoading(false);
          window.location.href = "/login";
          return;
        }
      }

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Your form inputs here... */}
        {/* (unchanged, omitted for brevity) */}
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          {loading ? <RingLoader size={30} color="#facc15" /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
