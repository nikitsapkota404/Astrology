// Controllers/muhuratController.js
import axios from "axios";

const userId = process.env.ASTROLOGY_API_USER_ID;
const apiKey = process.env.ASTROLOGY_API_KEY;

export const getMarriageMuhurat = async (req, res) => {
  const { dob, location } = req.body;

  if (!dob || !location) {
    return res.status(400).json({ error: "DOB and location are required." });
  }

  const birthDate = new Date(dob);
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  // Dummy location for now (Kathmandu)
  const hour = 6;
  const min = 0;
  const lat = 27.7172;
  const lon = 85.3240;
  const tzone = 5.75;

  const data = {
    day,
    month,
    year,
    hour,
    min,
    lat,
    lon,
    tzone,
    duration: 3,
  };

  const auth = Buffer.from(`${userId}:${apiKey}`).toString("base64");

  try {
    const response = await axios.post(
      "https://json.astrologyapi.com/v1/auspicious_muhurta/marriage",
      data,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching muhurta:", error.message);
    res.status(500).json({ error: "Failed to fetch muhurta data." });
  }
};
