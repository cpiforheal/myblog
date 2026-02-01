import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'strong' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
}

export function GlassCard({
  children,
  className,
  hover = false,
  onClick,
  variant = 'default',
  size = 'md'
}: GlassCardProps) {
  const Component = onClick ? motion.button : motion.div;

  const variants = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/30 dark:border-gray-800/30'
  };

  const sizes = {
    sm: 'p-4 rounded-2xl',
    md: 'p-6 rounded-3xl',
    lg: 'p-8 rounded-3xl'
  };

  return (
    <Component
      className={cn(
        variants[variant],
        sizes[size],
        hover && 'hover-lift cursor-pointer',
        onClick && 'focus-ring will-change-transform',
        'transition-all duration-300 ease-apple',
        className
      )}
      onClick={onClick}
      whileHover={hover ? {
        scale: 1.01,
        y: -2,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      } : undefined}
      whileTap={onClick ? {
        scale: 0.98,
        transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      } : undefined}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.05
      }}
    >
      {children}
    </Component>
  );
}