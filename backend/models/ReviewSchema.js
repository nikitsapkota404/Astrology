import mongoose from "mongoose";
import Astrologer from "./AstrologerSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    astrologer: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);
reviewSchema.pre(/^find/, function(next){
  this.populate({
    path:'user',
    select:'name photo',
  })
  next();
})
reviewSchema.statics.calcAverageRatings = async function(astrologerId) {
  const stats = await this.aggregate([{
    $match:{astrologer:astrologerId}
},
    {$group:{
      _id:'$astrologer',
      noOfRating:{$sum:1},
      avgRating:{$avg:'$rating'},
    }}
])
await Astrologer.findByIdAndUpdate(astrologerId,{
  totalRating:stats[0].noOfRating,
  averageRating:stats[0].avgRating,
})
  
}
reviewSchema.post('save', function(){
  this.constructor.calcAverageRatings(this.astrologer)
})

export default mongoose.model("Review", reviewSchema);
