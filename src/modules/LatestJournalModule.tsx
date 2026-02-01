import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BookOpen, Clock, MapPin, ArrowRight } from 'lucide-react';
import { getOptimizedAnimationConfig } from '@/utils/performance';

interface LatestJournalModuleProps {
  title?: string;
  category?: string;
  excerpt?: string;
  readTime?: string;
  location?: string;
  publishedAt?: string;
  onReadMore?: () => void;
}

export const LatestJournalModule = memo(function LatestJournalModule({
  title = "关于慢生活的思考",
  category = "生活感悟",
  excerpt = "在这个快节奏的时代，我们总是被各种事务推着向前跑，很少有时间停下来思考生活的意义。今天在公园里看到一位老人悠闲地喂鸽子，突然意识到...",
  readTime = "5 分钟阅读",
  location = "北京",
  publishedAt = "2 小时前",
  onReadMore
}: LatestJournalModuleProps) {
  const animationConfig = getOptimizedAnimationConfig();

  // 缓存动画配置
  const iconHoverAnimation = useMemo(() => ({
    scale: 1.05,
    rotate: 5,
    transition: { duration: animationConfig.duration, ease: [0.4, 0, 0.2, 1] }
  }), [animationConfig.duration]);

  const contentHoverAnimation = useMemo(() => ({
    initial: { opacity: 0.8 },
    whileHover: { opacity: 1 },
    transition: { duration: animationConfig.duration }
  }), [animationConfig.duration]);

  // 使用 useCallback 优化事件处理器
  const handleReadMore = useCallback(() => {
    onReadMore?.();
  }, [onReadMore]);

  return (
    <ScrollReveal delay={0.1}>
      <GlassCard hover className="h-full group">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-apple"
              whileHover={iconHoverAnimation}
            >
              <BookOpen size={22} className="text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                最新日记
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {publishedAt}
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>

        <motion.div {...contentHoverAnimation}>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </motion.div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {readTime}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {location}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReadMore}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400"
          >
            阅读更多
          </Button>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
});