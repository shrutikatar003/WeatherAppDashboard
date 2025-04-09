import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full max-w-md p-6 text-center bg-red-50 rounded-xl shadow-sm dark:bg-red-900/20 border border-red-200 dark:border-red-800">
      <span className="text-3xl" role="img" aria-label="warning">⚠️</span>
      <p className="mt-2 text-lg font-medium text-red-800 dark:text-red-300">{message}</p>
      <p className="mt-1 text-red-700 dark:text-red-400">Please check the city name and try again.</p>
    </div>
  );
};

export default ErrorMessage;
