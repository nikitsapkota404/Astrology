import User from "./../models/UserSchema.js";
import Booking from '../models/BookingSchema.js'
import Astrologer from '../models/AstrologerSchema.js'

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Sucessfully updated",
        data: updatedUser,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Successfully deleted.",
      });
    } catch (err) {
      console.error("Delete Error:", err);
      res.status(500).json({ success: false, message: "Failed to delete" });
    }
  };

  export const getOneUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(
        id,
      ).select("-password");
      res
        .status(200)
        .json({
          success: true,
          message: "User Found",
          data: user,
        });
    } catch (err) {
      res.status(404).json({ success: false, message: "User not Found" });
    }
  };

  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}).select("-password");
      res
        .status(200)
        .json({
          success: true,
          message: "Users Found",
          data: users,
        });
    } catch (err) {
      res.status(404).json({ success: false, message: "Users not Found" });
    }
  };

  export const getUserProfile=async(req,res)=>{
    const userId=req.userId

    try {
      const user =await User.findById(userId)

      if(!user){
      return res.status(404).json({ success: false, message: "Users not Found" });

      }
      const {password, ...rest}= user._doc  
       res.status(200).json({ success: true, message: "Getting profile info", data:{...rest} });

    } catch (err) {
      res.status(500).json({ success: false, message: "Something went wrong" });
      
    }
  }

  export const getMyAppointments = async (req, res) => {
    try {
      // 1. Find all bookings by the logged-in user
      const bookings = await Booking.find({ user: req.userId });
  
      // 2. Extract astrologer IDs
      const astrologerIds = bookings.map((el) => el.astrologer);
  
      // 3. Fetch astrologer data
      const astrologers = await Astrologer.find({ _id: { $in: astrologerIds } }).select("-password");
  
      // 4. Combine booking and astrologer data
      const detailedAppointments = bookings.map((booking) => {
        const astrologer = astrologers.find((ast) => ast._id.equals(booking.astrologer));
        return {
          ...booking._doc,
          astrologer,
        };
      });
  
      // 5. Send response
      res.status(200).json({
        success: true,
        message: "Appointments fetched successfully.",
        data: detailedAppointments,
      });
    } catch (err) {
      console.error("Error in getMyAppointments:", err.message);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  };