
import React from 'react';
import PropTypes from 'prop-types';

const buttonVariants = {
  primary: 'bg-[#A21D21] hover:bg-[#7A1818] dark:bg-[#C92828] dark:hover:bg-[#A21D21] text-white shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-[#A21D21]',
  secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
  outline: 'border-2 border-[#A21D21] dark:border-[#C92828] text-[#A21D21] dark:text-[#C92828] hover:bg-[#A21D21] hover:text-white dark:hover:bg-[#C92828] dark:hover:text-gray-900 focus:ring-2 focus:ring-offset-2 focus:ring-[#A21D21]',
  ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
  link: 'text-[#A21D21] dark:text-[#C92828] hover:underline focus:ring-2 focus:ring-offset-2 focus:ring-[#A21D21]'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
  xl: 'px-8 py-3 text-lg'
};

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  loading = false, 
  leftIcon, 
  rightIcon, 
  disabled = false, 
  className = '', 
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = buttonVariants[variant] || buttonVariants.primary;
  const sizeClasses = buttonSizes[size] || buttonSizes.md;
  const widthClasses = fullWidth ? 'w-full' : 'w-auto';
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'link']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string
};
