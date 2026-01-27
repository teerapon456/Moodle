
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        primary: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800',
        secondary: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
        success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
        warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
        error: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800',
        info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </span>
    );
});

Badge.displayName = 'Badge';
