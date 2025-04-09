import React from 'react';

const ForecastSection = ({ forecast }) => {
  if (!forecast) return null;

  const dailyForecasts = forecast.list
    .filter((item, index) => index % 8 === 4)
    .slice(0, 5);

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="w-full max-w-4xl">
      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">5-Day Forecast</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {dailyForecasts.map((item, index) => {
          const day = getDayName(item.dt);
          const { temp, humidity } = item.main;
          const { icon, description } = item.weather[0];

          return (
            <div key={index} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm dark:bg-gray-800 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{day}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}.png`} 
                alt={description} 
                className="w-16 h-16 my-2"
              />
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">{Math.round(temp)}°C</p>
              <p className="text-sm text-center text-gray-600 capitalize dark:text-gray-400">{description}</p>
              <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-1">💧</span>
                <span>{humidity}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastSection;