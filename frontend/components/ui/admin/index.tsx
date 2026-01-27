import React from 'react';

// --- Card Component ---
export const AdminCard = ({ children, className = '', title, action }: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center">
              {/* Optional: Add a decorative stick or icon if needed, for now just bold text */}
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

// --- Badge Component ---
export const AdminBadge = ({ children, variant = 'default', className = '' }: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  className?: string;
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
    success: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
    error: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800',
    info: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
    outline: 'border border-gray-300 text-gray-600 dark:text-gray-400'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const AdminButton = ({ children, variant = 'primary', size = 'md', icon, className = '', ...props }: ButtonProps) => {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl";

  const variants = {
    primary: "bg-gradient-to-r from-[#A21D21] to-[#7A1818] hover:from-[#7A1818] hover:to-[#A21D21] text-white focus:ring-[#A21D21]",
    secondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-gray-500",
    outline: "bg-transparent border-2 border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white dark:border-[#C92828] dark:text-[#C92828] dark:hover:bg-[#C92828] dark:hover:text-gray-900 shadow-none hover:shadow-md",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-500",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-none hover:shadow-sm transform-none"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && <span className="mr-2 -ml-1 h-4 w-4">{icon}</span>}
      {children}
    </button>
  );
};

// --- Input Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AdminInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
        <input
          ref={ref}
          className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#A21D21] dark:focus:border-[#C92828] focus:ring-2 focus:ring-[#A21D21]/20 dark:focus:ring-[#C92828]/20 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
AdminInput.displayName = "AdminInput";

// --- Modal Component ---
export const AdminModal = ({ isOpen, onClose, title, children, footer }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-slide-in">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
