import Review from './../models/ReviewSchema.js'
import Astrologer from './../models/AstrologerSchema.js'

export const getAllReviews = async (req,res) => {
        try {
            const reviews = await Review.find({})
            res.status(200).json({success:true, message:"Sucessful", data:reviews})

        } catch (err) {
            res.status(404).json({success:false, message:"Not Found"})
            
        }
    
}

export const createReview = async (req,res) => {
    if(!req.body.astrologer) req.body.astrologer = req.params.astrologerId
    if(!req.body.user) req.body.user = req.userId

    const newReview = new Review(req.body)
    try {
        const savedReview = await newReview.save()
        await Astrologer.findByIdAndUpdate(req.body.astrologer, {
            $push:{reviews:savedReview._id}
        })
        res.status(200).json({success:true, message:"Review Submitted.", data:savedReview})
    } catch (err) {
        res.status(500).json({success:false, message:err.message})
        
    }

    
}