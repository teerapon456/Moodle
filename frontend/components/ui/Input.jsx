
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const inputVariants = {
  default: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-[#A21D21] focus:ring-2 focus:ring-[#A21D21]/20 dark:focus:border-[#C92828] dark:focus:ring-[#C92828]/20',
  filled: 'bg-gray-100 dark:bg-gray-800 border-transparent text-gray-900 dark:text-gray-100 focus:border-[#A21D21] focus:ring-2 focus:ring-[#A21D21]/20',
  outlined: 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-[#A21D21] focus:ring-2 focus:ring-[#A21D21]/20'
};

const inputSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base'
};

export function Input({ 
  label, 
  error, 
  helperText, 
  leftIcon, 
  rightIcon, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  value = '',
  onChange = () => {},
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  const baseClasses = 'flex w-full rounded-lg border transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50';
  const variantClasses = inputVariants[variant] || inputVariants.default;
  const sizeClasses = inputSizes[size] || inputSizes.md;
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '';
  const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${errorClasses} ${iconPadding} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          className={classes}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'filled', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};
