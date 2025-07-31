import React, { useState } from "react";
import uploadImageToCloudinary from "../utils/uploadCloud";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: selectedFile,
    gender: "",
    role: "client",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-start justify-center pt-10 bg-gradient-to-r from-indigo-400 to-purple-500 px-5 lg:px-0">
      <div className="w-full max-w-[500px] bg-white mx-auto rounded-lg shadow-lg shadow-black md:p-10 p-6">
        <h3 className="text-headingColor text-[25px] leading-9 font-bold mb-10 text-center">
          Create Your Account
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              Photo
            </label>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileInputChange} 
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50"
            />

            {previewURL && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={previewURL}
                  alt="Selected"
                  className="w-24 h-24 object-cover rounded-full border border-gray-300"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              You are a:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="client">Client</option>
              <option value="astrologer">Astrologer</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? <RingLoader size={30} color="#facc15" /> : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-900 mt-6">
          Already registered?{" "}
          <a
            href="./login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  );
};

export default Signup;
