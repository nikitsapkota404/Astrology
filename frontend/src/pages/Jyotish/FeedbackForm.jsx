import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../../config";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [Hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading]= useState(false)

  const {id} = useParams()
  
  const handleSubmitReview = async e => {
    e.preventDefault();
    setLoading(true)

    try {
      if(!rating || !reviewText){
        setLoading(false)
         return toast.error("Rating and Review Fields are required.")
      }
      const res = await fetch(`${BASE_URL}/astrologers/${id}/reviews`,{
        method:'post',
        headers:{
          'Content-type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({rating, reviewText})
      })

      const result = await res.json()

      if(!res.ok){
        throw new Error(result.message)
      }
      setLoading(false)
      toast.success(result.message)
    } catch (err) {
        setLoading(false)
        toast.error(err.message)
    }
  }
  
  return (
    <form className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h3 className="text-headingColor text-lg font-semibold mb-4">
          How would you rate the overall experience?
        </h3>
        <div className="flex gap-1">
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (Hover || rating)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-2xl cursor-pointer transition-colors duration-200 hover:scale-110`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-headingColor text-lg font-semibold mb-4">
          Share your feedback
        </h3>
        <textarea
          className="border border-solid border-[#0066FF34] focus:outline focus:outline-primaryColor w-full px-4 py-3 rounded-md resize-none"
          rows="5"
          placeholder="Write your message here"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="px-6 py-3 bg-primaryColor text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-2 w-full md:w-auto"
        onClick={handleSubmitReview}
      >
        {loading ? <RingLoader size={25}/> :'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;