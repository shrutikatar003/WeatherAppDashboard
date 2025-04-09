import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full p-6">
      <div className="w-12 h-12 border-4 border-purple-200 rounded-full border-t-purple-600 animate-spin dark:border-purple-900 dark:border-t-purple-400"></div>
    </div>
  );
};

export default LoadingSpinner;
