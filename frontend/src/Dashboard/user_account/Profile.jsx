import React, { useEffect, useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloud";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const Profile = ({user}) => {

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
      useEffect(()=>{
        setFormData({name:user.name, email:user.email, photo:user.photo, gender:user.gender, rashi:user.rashi})
      },[user])
    
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
          const res = await fetch(`${BASE_URL}/users/${user._id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
    
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
              aria-readonly
              readOnly
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
              placeholder="Change password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
             
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
              
            />
          </div>
          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              Rashi
            </label>
            <input
              type="text"
              name="rashi"
              value={formData.rashi}
              onChange={handleChange}
              placeholder="Change Rashi"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              
            />
          </div>    

          <div>
            <label className="block mb-1 text-[16px] font-medium text-gray-900">
              {selectedFile ? selectedFile.name : 'Upload Photo'}
            </label>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileInputChange} // make sure this is the cloud upload function
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-gray-50"
            /> 

            {formData.photo && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={formData.photo}
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

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? <RingLoader size={30} color="#facc15" /> : "Update"}
          </button>
        </form>
    </div>
  )
}

export default Profile