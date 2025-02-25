import { useState, useEffect } from "react";


const API_KEY = process.env['EXPO_PUBLIC_API_KEY'];

export const useCityFetch = (cityName: string) => {
  const [cityData, setCityData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityName) return;

    const fetchCityWeather = async () => {
      setLoading(true);
      try {
        // Step 1: Convert city name to latitude & longitude
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (!geoData.length) {
          throw new Error("City not found");
        }

        const { lat, lon } = geoData[0];

        // Step 2: Fetch weather data 
        const weatherResponse = await fetch(
        //   `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        setCityData(weatherData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setCityData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCityWeather();
  }, [cityName]);

  return { cityData, loading, error };
};