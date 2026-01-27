
import React from 'react';
import PropTypes from 'prop-types';

export function Loading({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-[#A21D21] dark:border-t-[#C92828] rounded-full animate-spin`}></div>
      </div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  );
}

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string
};

export function Skeleton({ className = '', lines = 3 }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
  lines: PropTypes.number
};
