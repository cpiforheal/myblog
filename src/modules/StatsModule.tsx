import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TrendingUp, FileText, Camera, Calendar } from 'lucide-react';
import { getOptimizedAnimationConfig } from '@/utils/performance';

interface StatsModuleProps {
  stats?: {
    articles: number;
    photos: number;
    years: number;
    views?: number;
  };
}

export const StatsModule = memo(function StatsModule({
  stats = {
    articles: 24,
    photos: 156,
    years: 2,
    views: 10000
  }
}: StatsModuleProps) {
  const animationConfig = getOptimizedAnimationConfig();

  // 缓存统计项配置 - 更紧凑的布局
  const statItems = useMemo(() => [
    {
      label: '文章',
      value: `${stats.articles}`,
      unit: '篇',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      delay: 0
    },
    {
      label: '照片',
      value: `${stats.photos}`,
      unit: '张',
      icon: Camera,
      color: 'from-purple-500 to-purple-600',
      delay: 0.1
    },
    {
      label: '创作年限',
      value: `${stats.years}`,
      unit: '年',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      delay: 0.2
    },
    ...(stats.views ? [{
      label: '总访问量',
      value: `${(stats.views / 1000).toFixed(1)}`,
      unit: 'k',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      delay: 0.3
    }] : [])
  ], [stats.articles, stats.photos, stats.years, stats.views]);

  // 缓存动画配置
  const headerIconAnimation = useMemo(() => ({
    scale: 1.05,
    rotate: -5,
    transition: { duration: animationConfig.duration, ease: [0.4, 0, 0.2, 1] }
  }), [animationConfig.duration]);

  const footerAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: animationConfig.duration * 2, delay: 0.4 }
  }), [animationConfig.duration]);

  return (
    <ScrollReveal delay={0.2}>
      <GlassCard hover className="h-full group">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-apple"
            whileHover={headerIconAnimation}
          >
            <TrendingUp size={22} className="text-white" />
          </motion.div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            创作统计
          </h3>
        </div>

        {/* 紧凑的网格布局 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {statItems.map((item, index) => (
            <StatItem
              key={item.label}
              item={item}
              animationConfig={animationConfig}
              compact={true}
            />
          ))}
        </div>

        <motion.div
          className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            🎉 持续创作中，感谢支持！
          </p>
        </motion.div>
      </GlassCard>
    </ScrollReveal>
  );
});

// 提取统计项组件以优化性能
const StatItem = memo(function StatItem({
  item,
  animationConfig,
  compact = false
}: {
  item: {
    label: string;
    value: string;
    unit?: string;
    icon: React.ComponentType<{ size: number; className: string }>;
    color: string;
    delay: number;
  };
  animationConfig: { duration: number };
  compact?: boolean;
}) {
  const itemAnimation = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: animationConfig.duration * 1.5,
      delay: item.delay,
      ease: [0.4, 0, 0.2, 1]
    }
  }), [animationConfig.duration, item.delay]);

  const hoverAnimation = useMemo(() => ({
    scale: 1.02,
    y: -2
  }), []);

  if (compact) {
    return (
      <motion.div
        className="text-center p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-300 group"
        {...itemAnimation}
        whileHover={hoverAnimation}
      >
        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-apple-xs mx-auto mb-3 group-hover:shadow-apple transition-shadow duration-300`}>
          <item.icon size={18} className="text-white" />
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {item.value}
            </span>
            {item.unit && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.unit}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {item.label}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex justify-between items-center p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-300 group"
      {...itemAnimation}
      whileHover={hoverAnimation}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-apple-xs group-hover:shadow-apple transition-shadow duration-300`}>
          <item.icon size={16} className="text-white" />
        </div>
        <span className="text-gray-600 dark:text-gray-400 font-medium">
          {item.label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-bold text-gray-900 dark:text-gray-100 text-lg">
          {item.value}
        </span>
        {item.unit && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {item.unit}
          </span>
        )}
      </div>
    </motion.div>
  );
});