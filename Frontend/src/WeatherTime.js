import React, { useState, useEffect } from 'react';

function WeatherTime() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('Tokyo');
    const apiKey = '65b57864e4aaf04c8d9704c445af5ea8'; // Replace with your OpenWeatherMap API key

    useEffect(() => {
        // Update the time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        // Fetch weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
            })
            .catch(error => console.error('Error fetching weather:', error));

        return () => clearInterval(timer);
    }, [city]);

    return (
        <div>
            <h2>Current Time: {currentTime}</h2>
            <select value={city} onChange={e => setCity(e.target.value)}>
                <option value="London">London</option>
                <option value="New York">New York</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Sydney">Sydney</option>
            </select>
            <h3>Weather in {city}</h3>
            {weather.main ? (
                <div>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default WeatherTime;