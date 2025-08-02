import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import uploadImageToCloudinary from './../../utils/uploadCloud';

const Profile = ({ astrologersData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", office: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: astrologersData?.name || "",
      email: astrologersData?.email || "",
      phone: astrologersData?.phone || "",
      bio: astrologersData?.bio || "",
      gender: astrologersData?.gender || "",
      specialization: astrologersData?.specialization || "",
      ticketPrice: astrologersData?.ticketPrice || 0,
      qualifications: astrologersData?.qualifications?.length
        ? astrologersData.qualifications
        : [{ startingDate: "", endingDate: "", degree: "", university: "" }],
      experiences: astrologersData?.experiences?.length
        ? astrologersData.experiences
        : [{ startingDate: "", endingDate: "", position: "", office: "" }],
      timeSlots: astrologersData?.timeSlots?.length
        ? astrologersData.timeSlots
        : [{ day: "", startingTime: "", endingTime: "" }],
      about: astrologersData?.about || "",
      photo: astrologersData?.photo || null,
    });
  }, [astrologersData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // get fresh token here
      if (!token) {
        toast.error("Authentication token missing. Please login.");
        return;
      }

      const res = await fetch(`${BASE_URL}/astrologers/${astrologersData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        const errorData = await res.json();
        if (errorData.message && errorData.message.toLowerCase().includes("token is expired")) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
          return;
        }
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleReusableInputChange = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChange("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    if (formData.qualifications.length <= 1) return;

    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      office: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChange("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    if (formData.experiences.length <= 1) return;

    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const addTimeSlots = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };

  const handleTimeSlotsChange = (event, index) => {
    handleReusableInputChange("timeSlots", index, event);
  };

  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    if (formData.timeSlots.length <= 1) return;

    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index),
    }));
  };
  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Info
      </h2>
      <form className="max-w-xl mx-auto p-7 bg-white rounded-2xl shadow-lg">
        <div className="mb-5">
          <div className="w-[150px] h-[30px] bg-indigo-300 mb-5 rounded-full text-center shadow-xl mx-auto">
            <p className="text-[19px]">Personal Info</p>
          </div>
          <label htmlFor="name" className="form_label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full name"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="form_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input"
            aria-readonly
            readOnly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="form_label">
            Phone number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="phone number"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="bio" className="form_label">
            Bio
          </label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Enter bio"
            className="form_input"
            maxLength={500}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <p className="form_label">Specialization</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="vedic">Vedic</option>
                <option value="vasstu">Vasstu</option>
                <option value="numerology">Numerology</option>
                <option value="tarot">Tarot</option>
              </select>
            </div>
            <div>
              <p className="form_label">Price</p>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form_input"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="w-[150px] h-[30px] bg-indigo-300 mb-5 rounded-full text-center shadow-xl mx-auto">
            <p className="text-[19px]">Qualifications</p>
          </div>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Degree</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">University</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form_input mb-5"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                {index === formData.qualifications.length - 1 && (
                  <button
                    onClick={addQualification}
                    className="bg-green-500 p-2 rounded-full text-white text-[20px] mb-5 mt-2"
                  >
                    <AiOutlinePlus />
                  </button>
                )}
                {formData.qualifications.length > 1 &&
                  index !== formData.qualifications.length - 1 && (
                    <button
                      onClick={(e) => deleteQualification(e, index)}
                      className="bg-red-500 p-2 rounded-full text-white text-[20px] mt-2 mb-5 ml-[10px]"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-5">
          <div className="w-[150px] h-[30px] bg-indigo-300 mb-5 rounded-full text-center shadow-xl mx-auto">
            <p className="text-[19px]">Experiences</p>
          </div>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Position</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Office</p>
                    <input
                      type="text"
                      name="office"
                      value={item.office}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                {index === formData.experiences.length - 1 && (
                  <button
                    onClick={addExperience}
                    className="bg-green-500 p-2 rounded-full text-white text-[20px] mb-5 mt-2"
                  >
                    <AiOutlinePlus />
                  </button>
                )}
                {formData.experiences.length > 1 &&
                  index !== formData.experiences.length - 1 && (
                    <button
                      onClick={(e) => deleteExperience(e, index)}
                      className="bg-red-500 p-2 rounded-full text-white text-[20px] mt-2 mb-5 ml-[10px]"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-5">
          <div className="w-[150px] h-[30px] bg-indigo-300 mb-5 rounded-full text-center shadow-xl mx-auto">
            <p className="text-[19px]">Time Slots</p>
          </div>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-3 md:grid-cols-3 mb-1 gap-x-5 gap-y-8">
                  <div>
                    <p className="form_label">Day</p>
                    <select
                      name="day"
                      value={item.day}
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                      className="form_input py-3.5"
                      
                    >
                      <option value="">Select</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form_label">Starting Time</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form_input py-3.5"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Time</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form_input py-3.5"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                 
                </div>
                <div className="flex">
                {index === formData.timeSlots.length - 1 && (
                  <button
                    onClick={addTimeSlots}
                    className="bg-green-500 p-2 rounded-full text-white text-[20px] mb-5 mt-2"
                  >
                    <AiOutlinePlus />
                  </button>
                )}
                {formData.timeSlots.length > 1 &&
                  index !== formData.timeSlots.length - 1 && (
                    <button
                      onClick={(e) => deleteTimeSlots(e, index)}
                      className="bg-red-500 p-2 rounded-full text-white text-[20px] mt-2 mb-5"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
              </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-5">
          <div className="w-[150px] h-[30px] bg-indigo-300 mb-5 rounded-full text-center shadow-xl mx-auto">
            <p className="text-[19px]">About</p>
          </div>
          <textarea
            name="about"
            className="form_input"
            rows={5}
            value={formData.about}
            placeholder="Write something about you"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-5 flex flex-col gap-3">
          {/* Hidden file input */}
          <input
            type="file"
            id="photo-upload"
            name="photo"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <label
            htmlFor="photo-upload"
            className="w-[180px] text-center font-semibold px-4 py-3 bg-indigo-600 text-white rounded-xl cursor-pointer hover:bg-indigo-700"
          >
            Upload Photo
          </label>

          {formData.photoName && (
            <span className="text-m text-gray-900">
              Selected: {formData.photoName}
            </span>
          )}

          {formData.photo && (
            <div className="mt-2">
              <img
                src={formData.photo}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </div>
          )}
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl text-lg font-semibold w-full hover:scale-105 transform transition duration-300 ease-in-out"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
