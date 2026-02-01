import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Instagram, Globe, ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SocialLink {
  type: 'email' | 'twitter' | 'instagram' | 'website';
  url: string;
  label: string;
}

interface SocialIconsProps {
  links?: SocialLink[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'grid' | 'row';
}

const iconMap = {
  email: Mail,
  twitter: Twitter,
  instagram: Instagram,
  website: Globe
};

const colorMap = {
  email: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  twitter: 'from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700',
  instagram: 'from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
  website: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
};

export const SocialIcons = memo(function SocialIcons({
  links = [
    { type: 'email', url: 'mailto:hello@example.com', label: '邮箱' },
    { type: 'twitter', url: 'https://twitter.com/username', label: 'Twitter' },
    { type: 'instagram', url: 'https://instagram.com/username', label: 'Instagram' },
    { type: 'website', url: 'https://example.com', label: '个人网站' }
  ],
  className,
  size = 'md',
  layout = 'grid'
}: SocialIconsProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 16 },
    md: { container: 'w-12 h-12', icon: 20 },
    lg: { container: 'w-16 h-16', icon: 24 }
  };

  const layouts = {
    grid: 'grid grid-cols-2 gap-3',
    row: 'flex gap-3'
  };

  return (
    <div className={cn(layouts[layout], className)}>
      {links.map((link, index) => {
        const Icon = iconMap[link.type];
        const sizeConfig = sizes[size];

        return (
          <motion.a
            key={link.type}
            href={link.url}
            target={link.type !== 'email' ? '_blank' : undefined}
            rel={link.type !== 'email' ? 'noopener noreferrer' : undefined}
            className={cn(
              'relative group',
              sizeConfig.container,
              'bg-gradient-to-br',
              colorMap[link.type],
              'rounded-2xl flex items-center justify-center',
              'shadow-apple hover:shadow-apple-md',
              'transition-all duration-300 ease-apple',
              'focus-ring'
            )}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            whileHover={{
              scale: 1.1,
              y: -2,
              transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
            }}
            aria-label={link.label}
          >
            <Icon size={sizeConfig.icon} className="text-white" />

            {/* Hover tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-lg shadow-apple opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              initial={{ opacity: 0, y: 4 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              {link.label}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
            </motion.div>

            {/* External link indicator */}
            {link.type !== 'email' && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-apple-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <ExternalLink size={10} className="text-gray-600 dark:text-gray-400" />
              </motion.div>
            )}
          </motion.a>
        );
      })}
    </div>
  );
});