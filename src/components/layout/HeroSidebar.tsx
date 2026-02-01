import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { TagChip } from '@/components/ui/TagChip';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Clock, MapPin, Sparkles } from 'lucide-react';
import { getOptimizedAnimationConfig } from '@/utils/performance';

interface TimelineItem {
  id: string;
  title: string;
  time: string;
  type: 'post' | 'photo' | 'milestone';
}

interface HeroSidebarProps {
  avatar?: string;
  name?: string;
  location?: string;
  showStatus?: boolean;
  tags?: string[];
  timeline?: TimelineItem[];
  className?: string;
}

export const HeroSidebar = memo(function HeroSidebar({
  avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  name = "我的",
  location = "北京",
  showStatus = true,
  tags = ["React", "TypeScript", "设计", "摄影", "写作", "旅行"],
  timeline = [
    { id: '1', title: '发布新文章', time: '2小时前', type: 'post' },
    { id: '2', title: '上传照片', time: '1天前', type: 'photo' },
    { id: '3', title: '访问量突破10k', time: '3天前', type: 'milestone' }
  ],
  className
}: HeroSidebarProps) {
  const animationConfig = getOptimizedAnimationConfig();

  // 缓存动画配置
  const avatarHoverAnimation = useMemo(() => ({
    scale: 1.05,
    y: -2,
    transition: { duration: animationConfig.duration, ease: [0.4, 0, 0.2, 1] }
  }), [animationConfig.duration]);

  const statusAnimation = useMemo(() => ({
    scale: [1, 1.1, 1],
    boxShadow: [
      '0 0 0 0 rgba(34, 197, 94, 0.4)',
      '0 0 0 8px rgba(34, 197, 94, 0)',
      '0 0 0 0 rgba(34, 197, 94, 0)'
    ]
  }), []);

  const getTimelineIcon = (type: TimelineItem['type']) => {
    const colors = {
      post: 'bg-blue-500',
      photo: 'bg-purple-500',
      milestone: 'bg-yellow-500'
    };
    return colors[type] || colors.post;
  };

  return (
    <ScrollReveal className={className}>
      <div className="space-y-6">
        {/* Avatar Card */}
        <GlassCard size="lg" className="text-center">
          <div className="relative inline-block mb-6">
            <motion.div
              whileHover={avatarHoverAnimation}
              className="relative"
            >
              <img
                src={avatar}
                alt={`${name}的头像`}
                className="w-24 h-24 rounded-3xl border-4 border-white/80 dark:border-gray-700/80 shadow-apple-lg"
                width={96}
                height={96}
              />
            </motion.div>

            {showStatus && (
              <motion.div
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-apple"
                animate={statusAnimation}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {name}
            </h2>
            {location && (
              <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-4">
                <MapPin size={14} />
                <span className="text-sm">{location}</span>
              </div>
            )}
            <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100/80 dark:bg-green-900/80 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              <Sparkles size={12} />
              在线
            </div>
          </motion.div>
        </GlassCard>

        {/* Tags */}
        <GlassCard size="md">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-primary-500" />
            兴趣标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <TagChip
                  variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'default'}
                >
                  {tag}
                </TagChip>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Mini Timeline */}
        <GlassCard size="md">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Clock size={16} className="text-primary-500" />
            最近动态
          </h3>
          <div className="space-y-3">
            {timeline.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div className={`w-2 h-2 rounded-full ${getTimelineIcon(item.type)} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              持续创作中...
            </p>
          </motion.div>
        </GlassCard>
      </div>
    </ScrollReveal>
  );
});