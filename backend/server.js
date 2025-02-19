const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4050;
const NASA_API_KEY = process.env.NASA_API_KEY;

app.get("/asteroids", async (req, res) => {
    const { start_date, end_date } = req.query;

    const convertDateFormat = (date) => {
        const [year, month, day] = date.split("-");
        return `${year}-${month}-${day}`;
    };
    start_date = convertDateFormat(start_date);
    end_date = convertDateFormat(end_date);

    if (!start_date || !end_date) {
        return res.status(400).json({ error: "Missing start_date or end_date" });
    }

    // ✅ Ensure date range is within 7 days
    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);
    const dateDifference = (endDateObj - startDateObj) / (1000 * 60 * 60 * 24);

    if (dateDifference > 7) {
        return res.status(400).json({ error: "NASA API only supports a maximum 7-day range." });
    }

    try {
        const nasaApiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`;
        const response = await axios.get(nasaApiUrl);

        // ✅ Filter results within the selected date range
        const filteredAsteroids = Object.keys(response.data.near_earth_objects)
            .filter(date => date >= start_date && date <= end_date)
            .map(date => response.data.near_earth_objects[date])
            .flat();

        res.json({ asteroids: filteredAsteroids });
    } catch (error) {
        console.error("NASA API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({
            error: "Failed to fetch asteroid data. Check API key and request format.",
            details: error.response ? error.response.data : error.message
        });
    }
});
