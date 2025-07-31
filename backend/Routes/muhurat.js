// Routes/muhurat.js
import express from "express";
import { getMarriageMuhurat } from "../Controllers/muhuratController.js";

const router = express.Router();

router.post("/", getMarriageMuhurat);

export default router;

