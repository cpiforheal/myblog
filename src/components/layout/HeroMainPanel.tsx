import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Sparkles, Heart } from 'lucide-react';
import { getOptimizedAnimationConfig } from '@/utils/performance';

interface SocialLink {
  type: 'email' | 'twitter' | 'instagram' | 'website';
  url: string;
  label: string;
}

interface HeroMainPanelProps {
  title?: string;
  subtitle?: string;
  description?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

export const HeroMainPanel = memo(function HeroMainPanel({
  title = "数字花园",
  subtitle = "记录生活，分享思考",
  description = "在这个快节奏的时代，我用文字和影像记录生活的点点滴滴，分享内心的思考与感悟。这里是我的数字花园，每一篇文章、每一张照片都是我用心栽培的花朵。",
  socialLinks = [
    { type: 'email', url: 'mailto:hello@example.com', label: '邮箱联系' },
    { type: 'twitter', url: 'https://twitter.com/username', label: 'Twitter' },
    { type: 'instagram', url: 'https://instagram.com/username', label: 'Instagram' },
    { type: 'website', url: 'https://example.com', label: '个人网站' }
  ],
  className
}: HeroMainPanelProps) {
  const animationConfig = getOptimizedAnimationConfig();

  // 缓存动画配置
  const titleAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: animationConfig.duration * 2,
      ease: [0.4, 0, 0.2, 1]
    }
  }), [animationConfig.duration]);

  const subtitleAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: animationConfig.duration * 1.5,
      delay: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }), [animationConfig.duration]);

  const descriptionAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: animationConfig.duration * 1.5,
      delay: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }), [animationConfig.duration]);

  const socialAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: animationConfig.duration * 1.5,
      delay: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }), [animationConfig.duration]);

  return (
    <ScrollReveal className={className}>
      <div className="flex flex-col justify-center h-full py-12 lg:py-16">
        {/* Main Title */}
        <motion.div
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          transition={titleAnimation.transition}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight leading-none">
            欢迎来到
            <motion.span
              className="block text-gradient mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {title}
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={subtitleAnimation.initial}
          animate={subtitleAnimation.animate}
          transition={subtitleAnimation.transition}
        >
          <div className="flex items-center gap-2 mb-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <Sparkles size={24} className="text-primary-500" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              {subtitle}
            </h2>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={descriptionAnimation.initial}
          animate={descriptionAnimation.animate}
          transition={descriptionAnimation.transition}
        >
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
            {description}
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={socialAnimation.initial}
          animate={socialAnimation.animate}
          transition={socialAnimation.transition}
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={18} className="text-red-500" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                联系方式
              </h3>
            </div>
            <SocialIcons
              links={socialLinks}
              size="lg"
              layout="row"
              className="justify-start"
            />
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="flex items-center gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              正在创作中
            </span>
          </div>

          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />

          <motion.span
            className="text-sm text-gray-500 dark:text-gray-400"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            持续更新
          </motion.span>
        </motion.div>
      </div>
    </ScrollReveal>
  );
});