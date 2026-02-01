import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface TagChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
}

export const TagChip = memo(function TagChip({
  children,
  variant = 'default',
  size = 'sm',
  className,
  onClick
}: TagChipProps) {
  const Component = onClick ? motion.button : motion.div;

  const variants = {
    default: 'bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80',
    primary: 'bg-primary-100/80 dark:bg-primary-900/80 text-primary-700 dark:text-primary-300 hover:bg-primary-200/80 dark:hover:bg-primary-800/80',
    secondary: 'bg-purple-100/80 dark:bg-purple-900/80 text-purple-700 dark:text-purple-300 hover:bg-purple-200/80 dark:hover:bg-purple-800/80'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-4 py-2 text-sm font-medium'
  };

  return (
    <Component
      className={cn(
        'inline-flex items-center rounded-full backdrop-blur-sm',
        'border border-white/30 dark:border-gray-700/30',
        'transition-all duration-200 ease-apple',
        'shadow-apple-xs hover:shadow-apple',
        variants[variant],
        sizes[size],
        onClick && 'cursor-pointer focus-ring',
        className
      )}
      onClick={onClick}
      whileHover={onClick ? {
        scale: 1.05,
        y: -1,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      } : undefined}
      whileTap={onClick ? {
        scale: 0.95,
        transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      } : undefined}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </Component>
  );
});