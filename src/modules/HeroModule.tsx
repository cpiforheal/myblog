import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface HeroModuleProps {
  avatar?: string;
  name?: string;
  title?: string;
  description?: string;
  showStatus?: boolean;
}

export function HeroModule({
  avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  name = "我的",
  title = "数字花园",
  description = "记录生活点滴，分享思考感悟，用文字和影像编织属于自己的故事",
  showStatus = true
}: HeroModuleProps) {
  return (
    <ScrollReveal>
      <section className="text-center mb-16">
        <div className="relative inline-block mb-8">
          <motion.img
            src={avatar}
            alt="头像"
            className="w-28 h-28 rounded-full border-4 border-white/80 dark:border-gray-700/80 shadow-apple-lg"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          />
          {showStatus && (
            <motion.div
              className="absolute -bottom-1 -right-1 w-9 h-9 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-apple"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 0 rgba(34, 197, 94, 0.4)',
                  '0 0 0 8px rgba(34, 197, 94, 0)',
                  '0 0 0 0 rgba(34, 197, 94, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            欢迎来到{name}
            <span className="text-gradient ml-3 block sm:inline">{title}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            {description}
          </p>
        </motion.div>
      </section>
    </ScrollReveal>
  );
}