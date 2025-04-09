import React from 'react';

const WeatherCard = ({ weather, onRefresh }) => {
  const { name, main, weather: weatherDetails, wind, sys } = weather;
  const { temp, feels_like, humidity, pressure } = main;
  const { description, icon } = weatherDetails[0];
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden bg-white rounded-2xl shadow-lg dark:bg-gray-800 transition-all duration-300 hover:shadow-xl">
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}, {sys.country}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <button 
            onClick={onRefresh} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Refresh"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
          <div className="flex items-center">
            <img 
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
              alt={description}
              className="w-24 h-24"
            />
            <div className="ml-4">
              <p className="text-4xl font-bold text-gray-800 dark:text-white">{Math.round(temp)}°C</p>
              <p className="text-lg text-gray-600 capitalize dark:text-gray-300">{description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 md:mt-0">
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{Math.round(feels_like)}°C</p>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{humidity}%</p>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{Math.round(wind.speed)} m/s</p>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Sunrise: </span>
          <span className="font-medium text-gray-800 dark:text-gray-300">{formatTime(sys.sunrise)}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Sunset: </span>
          <span className="font-medium text-gray-800 dark:text-gray-300">{formatTime(sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;