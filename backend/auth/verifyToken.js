import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'
import Astrologer from '../models/AstrologerSchema.js'

export const authenticate = async (req,res,next) => {
    const authToken =req.headers.authorization

    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({status:false, message:"Authorization Denied!"})
    }

    try {
        const token = authToken.split(' ')[1]
       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
console.log("Decoded token:", decoded);
req.userId = decoded.id;
req.role = decoded.role;

        next();
    } catch (err) {
        if(err.name==="TokenExpiredError"){
            return res.status(401).json({message:"Token is expired."})
        }
        return res.status(401).json({status:false, message:"Invalid Token"})

        
    }
    
}

export const restrict = roles => async(req, res, next) => {
    const userId = req.userId;
    let user = null;
    
    try {
       
        user = await User.findById(userId);
        
        // If not found in User collection, check Astrologer collection
        if (!user) {
            user = await Astrologer.findById(userId);
        }
        
        // If user is still not found in either collection
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found"
            });
        }
        
        // Check if user has the required role
        if (!roles.includes(user.role)) {
            return res.status(403).json({
                success: false, 
                message: "You are not authorized for this action"
            });
        }
        
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({
            success: false, 
            message: "Server error during authorization"
        });
    }
}