import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Camera, User } from 'lucide-react';
import { cn } from '@/utils/cn';

const navigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '日记', href: '/journal', icon: BookOpen },
  { name: '相册', href: '/gallery', icon: Camera },
  { name: '关于', href: '/about', icon: User },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-200/50 dark:border-gray-700/50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around px-4 py-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
                  layoutId="bottom-nav-indicator"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon size={20} />
              </motion.div>
              <span className="relative z-10 text-xs font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}