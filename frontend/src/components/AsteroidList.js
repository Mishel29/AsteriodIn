import React, { useState, useCallback } from "react";  
import axios from "axios";  
import { ClipLoader } from "react-spinners";
import "./AsteroidList.css"; 

function AsteroidList() {
    const [asteroids, setAsteroids] = useState([]);
    const [startDate, setStartDate] = useState("2025-02-10");
    const [endDate, setEndDate] = useState("2025-02-12");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAsteroid, setSelectedAsteroid] = useState(null);

    // ✅ Fetch Asteroid Data
    // Function to format date
const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
};

const fetchAsteroids = useCallback(async () => {
    setLoading(true);
    setError(null);

    // ✅ Format dates to YYYY-MM-DD
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);


    // ✅ Calculate date difference in days
    const startDateObj = new Date(formattedStartDate);
    const endDateObj = new Date(formattedEndDate);
    const dateDifference = (endDateObj - startDateObj) / (1000 * 60 * 60 * 24);

    // ❌ Prevent fetching if date range exceeds 7 days
    if (dateDifference > 7) {
        setError("⚠️ Date range should not exceed 7 days!");
        setAsteroids([]);
        setLoading(false);
        return;
    }

    try {
        console.log(`Fetching data for: ${formattedStartDate} to ${formattedEndDate}`);

        const response = await axios.get(
            `http://localhost:4050/asteroids?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
        );

        if (response.data.asteroids) {
            setAsteroids(response.data.asteroids);
        } else {
            setAsteroids([]);
        }
    } catch (error) {
        setError("Failed to fetch data. Check your backend or API key.");
    }

    setLoading(false);
}, [startDate, endDate]);



    return (
        <div className="container">
            <h1><span role="img" aria-label="Rocket">🚀</span> NASA Asteroid Explorer</h1>
            <h2><span role="img" aria-label="Earth">🌍</span> Near Earth Objects (Asteroids)</h2>

            <div className="date-picker">
                <label>Start Date: 
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>End Date: 
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
                <button onClick={fetchAsteroids} disabled={loading}>
                    {loading ? "Loading..." : "Fetch Asteroids"}
                </button>
            </div>

            {loading && <ClipLoader color="#007bff" size={35} />}
            {error && <p className="error">{error}</p>}

            <h2><span role="img" aria-label="Rock">🪨</span> Asteroids List:</h2>
            <ul className="asteroid-list">
                {asteroids.map((asteroid) => (
                    <React.Fragment key={asteroid.id}>
                        {/* Asteroid Item */}
                        <li 
                            onClick={() => setSelectedAsteroid(selectedAsteroid?.id === asteroid.id ? null : asteroid)}
                            className={selectedAsteroid?.id === asteroid.id ? "selected" : ""}
                        >
                            <strong>{asteroid.name}</strong> - Diameter: {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                        </li>

                        {/* Render details right below the clicked asteroid */}
                        {selectedAsteroid?.id === asteroid.id && (
                            <div className="asteroid-details">
                                <h3><span role="img" aria-label="Satellite">🛰️</span> Asteroid Details: {asteroid.name}</h3>
                                <p><strong><span role="img" aria-label="ID Symbol">🆔</span> ID:</strong> {asteroid.id}</p>
                                <p><strong><span role="img" aria-label="Telescope">🔭</span> Absolute Magnitude:</strong> {asteroid.absolute_magnitude_h}</p>
                                <p><strong><span role="img" aria-label="Earth">🌍</span> Potentially Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? "Yes " : "No "}
                                    <span role="img" aria-label={asteroid.is_potentially_hazardous_asteroid ? "Warning Sign" : "Check Mark"}>
                                        {asteroid.is_potentially_hazardous_asteroid ? "🚨" : "✅"}
                                    </span>
                                </p>
                                <p><strong><span role="img" aria-label="Ruler">📏</span> Estimated Diameter:</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                                <p><strong><span role="img" aria-label="Map Pin">📌</span> Miss Distance:</strong> {asteroid.close_approach_data[0].miss_distance.kilometers} km</p>
                                <p><strong><span role="img" aria-label="Lightning Bolt">⚡</span> Velocity:</strong> {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
                                <p><strong><span role="img" aria-label="Orbit">🔄</span> Orbiting Body:</strong> {asteroid.close_approach_data[0].orbiting_body}</p>
                                <button onClick={() => setSelectedAsteroid(null)} className="close-btn">Close</button>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default AsteroidList;
