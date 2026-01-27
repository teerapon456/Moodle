
import React from 'react';
import PropTypes from 'prop-types';

const cardVariants = {
  default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md',
  elevated: 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl',
  glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/40 dark:border-gray-700/40 shadow-xl hover:shadow-2xl',
  outlined: 'bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
};

const cardPadding = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
};

export function Card({ 
  children, 
  variant = 'default', 
  padding = 'md', 
  hover = false, 
  className = '', 
  ...props 
}) {
  const baseClasses = 'rounded-xl transition-all duration-300';
  const variantClasses = cardVariants[variant] || cardVariants.default;
  const paddingClasses = cardPadding[padding] || cardPadding.md;
  const hoverClasses = hover ? 'hover:scale-[1.02] cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variantClasses} ${paddingClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'elevated', 'glass', 'outlined']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  hover: PropTypes.bool,
  className: PropTypes.string
};
