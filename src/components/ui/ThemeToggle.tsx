import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';
import type { Theme } from '@/types';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={16} />, label: '浅色' },
    { value: 'dark', icon: <Moon size={16} />, label: '深色' },
    { value: 'system', icon: <Monitor size={16} />, label: '系统' },
  ];

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      {themes.map((t) => (
        <motion.button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={cn(
            'relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            theme === t.value
              ? 'text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === t.value && (
            <motion.div
              className="absolute inset-0 bg-primary-500 rounded-lg"
              layoutId="theme-indicator"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1">
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}