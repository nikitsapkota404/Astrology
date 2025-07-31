import React, { useState } from 'react'
import avatar from './../../assets/images/avatar-icon.png'
import { FormatDate } from '../../utils/FormatDate'
import {AiFillStar} from 'react-icons/ai'
import FeedbackForm from './FeedbackForm'

const Feedback = ({reviews, totalRating}) => {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  return (
    <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
            <h4 className="text-2xl font-bold text-headingColor mb-6">All Reviews ({totalRating})</h4>
        { reviews?.map((review, index)=>(
            <div key={index} className="flex flex-col md:flex-row justify-between gap-4 md:gap-10 mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex gap-4">
                <figure className="w-12 h-12 rounded-full overflow-hidden"> 
                    <img className="w-full h-full object-cover" src={review?.user?.photo} alt="User avatar" />
                </figure>
                <div>
                    <h5 className="text-base font-bold text-primaryColor">{review?.user?.name}</h5>
                    <p className="text-sm text-textColor opacity-75">{FormatDate(review?.createdAt)}</p>
                    <p className="mt-2 text-base font-medium">{review.reviewText}</p>
                </div>
            </div>
            <div className="flex gap-1 mt-2 md:mt-0">
                {[...Array(review?.rating).keys()].map((_,index)=> <AiFillStar key={index} color='#0067FF' size={20}/>)}
            </div>
        </div>
        )) }
        </div>
        {!showFeedbackForm && (
            <div className="text-center mb-10">
                <button 
                    className="px-6 py-3 bg-primaryColor text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                    onClick={()=> setShowFeedbackForm(true)}
                >
                    Give Feedback
                </button>
            </div>
        )}
        {showFeedbackForm && <FeedbackForm/>}
    </div>
  )
}

export default Feedback