import User from "../models/UserSchema.js";
import Astrologer from "../models/AstrologerSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config()

const generateToken=user=>{
  return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY,{
    expiresIn:'15d'
  })
}

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    // Check if the user already exists based on their role
    if (role === "client") {
      user = await User.findOne({ email });
    } else if (role === "astrologer") {
      user = await Astrologer.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(password, salt);

    // Create the user based on the role
    if (role === "client") {
      user = new User({ name, email, password: hashPw, photo, gender, role });
    } else if (role === "astrologer") {
      user = new Astrologer({
        name,
        email,
        password: hashPw,
        photo,
        gender,
        role,
      });
    }

    // Save the user to the database
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("Error during user registration:", err); // Better error logging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
 
export const login = async (req, res) => {
  const {email, password}=req.body
  try {

    let user=null
    const client = await User.findOne({email})
    const astrologer = await Astrologer.findOne({email})
    if(client){
      user=client
    }
    if(astrologer){
      user=astrologer
    }
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch){
      return res.status(400).json({status:false,message: "Invalid Credentials"})
    }

    const token= generateToken(user)
    const {password:hashPw, role, appointment, ...rest} = user._doc

    res.status(200).json({success:true,message: "Successfully Logged in!!", token, data:{...rest},role});
  
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({success:false,message: "Failed to login "})
  }
};
