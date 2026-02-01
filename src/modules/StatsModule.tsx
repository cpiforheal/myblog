import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TrendingUp, FileText, Camera, Calendar } from 'lucide-react';

interface StatsModuleProps {
  stats?: {
    articles: number;
    photos: number;
    years: number;
    views?: number;
  };
}

export function StatsModule({
  stats = {
    articles: 24,
    photos: 156,
    years: 2,
    views: 10000
  }
}: StatsModuleProps) {
  const statItems = [
    {
      label: '文章',
      value: `${stats.articles} 篇`,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      delay: 0
    },
    {
      label: '照片',
      value: `${stats.photos} 张`,
      icon: Camera,
      color: 'from-purple-500 to-purple-600',
      delay: 0.1
    },
    {
      label: '创作年限',
      value: `${stats.years} 年`,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      delay: 0.2
    },
    ...(stats.views ? [{
      label: '总访问量',
      value: `${(stats.views / 1000).toFixed(1)}k`,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      delay: 0.3
    }] : [])
  ];

  return (
    <ScrollReveal delay={0.2}>
      <GlassCard className="h-full">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-apple"
            whileHover={{ scale: 1.05, rotate: -5 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <TrendingUp size={22} className="text-white" />
          </motion.div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            创作统计
          </h3>
        </div>

        <div className="space-y-5">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex justify-between items-center p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-300 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: item.delay,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-apple-xs group-hover:shadow-apple transition-shadow duration-300`}>
                  <item.icon size={16} className="text-white" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {item.label}
                </span>
              </div>
              <motion.span
                className="font-bold text-gray-900 dark:text-gray-100 text-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: item.delay + 0.2,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                {item.value}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200/50 dark:border-green-700/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-green-700 dark:text-green-300 text-center font-medium">
            🎉 持续创作中，感谢每一位读者的支持！
          </p>
        </motion.div>
      </GlassCard>
    </ScrollReveal>
  );
}