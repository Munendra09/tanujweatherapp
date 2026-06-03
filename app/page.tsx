"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    if (city.trim() === "") {
      alert("Please enter city name");
      return;
    }

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=e6af400e3b4e4c2cb0e113919260306&q=${city}&aqi=yes`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError(false);
    } catch (err) {
      setWeather(null);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-sky-300 to-blue-600 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
         Tanuj Weather App
        </h2>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchWeather();
            }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-3 outline-none focus:border-blue-500 text-gray-800"
          />

          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {weather && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1">
              {weather.location.name}, {weather.location.country}
            </h3>

            <div className="text-5xl font-bold text-blue-600 mb-3">
              {Math.round(weather.current.temp_c)}°C
            </div>

            <div className="capitalize text-gray-600 italic">
              {weather.current.condition.text}
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 mt-3">
            City not found. Try again!
          </div>
        )}
      </div>
    </div>
  );
}
