import express from "express";
import User from "../models/UserSchema.js";
import Astrologer from "../models/AstrologerSchema.js";
import Admin from "../models/AdminSchema.js"; 
import jwt from 'jsonwebtoken';
const router = express.Router();

// GET all users (excluding password)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

router.get("/astrologers", async (req, res) => {
  try {
    const astrologers = await Astrologer.find().select("-password");
    res.json(astrologers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch astrologers" });
  }
});

// Delete astrologer by ID
router.delete("/astrologers/:id", async (req, res) => {
  try {
    await Astrologer.findByIdAndDelete(req.params.id);
    res.json({ message: "Astrologer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete astrologer" });
  }
});

router.patch("/astrologers/:id/approve", async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);
    if (!astrologer) return res.status(404).json({ message: "Astrologer not found" });

    astrologer.isApproved = "approved";
    await astrologer.save();

    res.json({ message: "Astrologer approved successfully" });
  } catch (error) {
    console.error("Error approving astrologer:", error);
    res.status(500).json({ message: "Failed to approve astrologer" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const totalAstrologers = await Astrologer.countDocuments();
    const totalClients = await User.countDocuments({ role: "client" }); // or adjust as per your schema

    res.json({
      totalAstrologers,
      totalClients,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});
router.get('/top-rated', async (req, res) => {
  try {
    const astrologers = await Astrologer.find()
      .sort({ averageRating: -1 }) // highest rating first
      .limit(5); // only top 5
    res.json(astrologers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password }); // simple check
    if (!admin) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Instead of JWT, just send success message
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
