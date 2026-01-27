
import React from 'react';
import PropTypes from 'prop-types';

const badgeVariants = {
  primary: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800',
  secondary: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
  error: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800',
  info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm'
};

export function Badge({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseClasses = 'inline-flex items-center rounded-full text-xs font-semibold transition-all duration-200';
  const variantClasses = badgeVariants[variant] || badgeVariants.primary;
  const sizeClasses = badgeSizes[size] || badgeSizes.md;
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};
