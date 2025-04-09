import React from 'react';

const RecentSearches = ({ searches, onSelectSearch }) => {
  return (
    <div className="mt-4 mb-6">
      <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((city, index) => (
          <button 
            key={index} 
            onClick={() => onSelectSearch(city)}
            className="px-3 py-1 text-sm bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full hover:shadow-md dark:hover:shadow-lg dark:shadow-gray-900/50 dark:text-gray-300 transition-all duration-200 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {city}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;