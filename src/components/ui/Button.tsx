import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  loading = false,
  icon,
  iconPosition = 'left',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-apple focus-ring disabled:opacity-50 disabled:cursor-not-allowed will-change-transform';

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    outline: 'border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl font-medium transition-all duration-300 ease-apple shadow-apple-xs hover:shadow-apple',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl gap-2',
    md: 'px-6 py-3 text-base rounded-2xl gap-2',
    lg: 'px-8 py-4 text-lg rounded-2xl gap-3',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={!isDisabled ? {
        scale: 1.02,
        y: -1,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      } : undefined}
      whileTap={!isDisabled ? {
        scale: 0.98,
        y: 0,
        transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      } : undefined}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      {!loading && children}

      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </motion.button>
  );
}