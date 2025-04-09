import React, { useState, useEffect } from 'react';
import './App.css';
import { SearchBar, RecentSearches, LoadingSpinner, ErrorMessage, WeatherCard, ForecastSection, ThemeToggle } from './components';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const API_KEY = "807fffe191bdc40a792f6f2b85c3a2da";

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error('City not found or API error');
      }

      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      updateRecentSearches(city);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (city) => {
    if (!recentSearches.includes(city)) {
      const newSearches = [city, ...recentSearches.slice(0, 4)];
      setRecentSearches(newSearches);
    } else {
      const filteredSearches = recentSearches.filter(item => item !== city);
      setRecentSearches([city, ...filteredSearches]);
    }
  };

  const handleRefresh = () => {
    if (weather) {
      fetchWeather(weather.name);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Weather Dashboard</h1>
          </div>
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </header>

        <main className="flex flex-col space-y-6">
          <div className="max-w-md mx-auto w-full">
            <SearchBar onSearch={fetchWeather} />
            {recentSearches.length > 0 && (
              <RecentSearches 
                searches={recentSearches} 
                onSelectSearch={fetchWeather} 
              />
            )}
          </div>

          <div className="flex flex-col items-center space-y-6">
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {weather && !loading && !error && (
              <>
                <WeatherCard 
                  weather={weather} 
                  onRefresh={handleRefresh} 
                />
                {forecast && (
                  <ForecastSection forecast={forecast} />
                )}
              </>
            )}
          </div>
        </main>

        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>Weather data provided by OpenWeatherMap</p>
          <p className="text-sm mt-1">© {new Date().getFullYear()} Weather Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default App;