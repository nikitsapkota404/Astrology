import Booking from "../models/BookingSchema.js";
import Astrologer from "./../models/AstrologerSchema.js";

export const updateAstrologer = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAStrologer = await Astrologer.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Sucessfully updated",
      data: updatedAStrologer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
export const deleteAstrologer = async (req, res) => {
  const id = req.params.id;
  try {
    await Astrologer.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted.",
    });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getOneAstrologer = async (req, res) => {
  const id = req.params.id;
  try {
    const astrologer = await Astrologer.findById(id).populate('reviews').select("-password");
    res.status(200).json({
      success: true,
      message: "Astrologer Found",
      data: astrologer,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Astrologer not Found" });
  }
};

export const getAllAstrologers = async (req, res) => {
  try {
    const { query } = req.query;
    let astrologers;
    if (query) {
      astrologers = await Astrologer.find({
        isApproved: "approved",
        $or: [{ name: { $regex: query, $options: "i" } },
              { specialization: { $regex: query, $options: "i" } }],
      }).select("-password")
    }else{
    astrologers = await Astrologer.find({isApproved:"approved"}).select("-password");

    }

    
    res.status(200).json({
      success: true,
      message: "Astrologers Found",
      data: astrologers,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Astrologers not Found" });
  }
};


export const getAstrologerProfile = async(req,res)=>{
  const astrologerId = req.userId
  
  try {
    const astrologer = await Astrologer.findById(astrologerId)  
    if(!astrologer){
      return res.status(404).json({ success: false, message: "Astrologer not Found" });
    }
    const {password, ...rest} = astrologer._doc 
    const appointments = await Booking.find({astrologer:astrologerId}) 
    res.status(200).json({ success: true, message: "Getting profile info", data:{...rest, appointments} });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}