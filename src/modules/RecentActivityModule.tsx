import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Heart, FileText, Camera, Trophy, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'post' | 'photo' | 'milestone' | 'update';
  title: string;
  time: string;
  description?: string;
}

interface RecentActivityModuleProps {
  activities?: Activity[];
}

export function RecentActivityModule({
  activities = [
    {
      id: '1',
      type: 'post',
      title: '发布了新文章《关于慢生活的思考》',
      time: '2 小时前',
      description: '分享了对现代生活节奏的思考'
    },
    {
      id: '2',
      type: 'photo',
      title: '上传了 5 张秋日街拍照片',
      time: '1 天前',
      description: '记录城市中的秋日美景'
    },
    {
      id: '3',
      type: 'milestone',
      title: '博客访问量突破 10,000 次',
      time: '3 天前',
      description: '感谢每一位读者的支持'
    },
    {
      id: '4',
      type: 'update',
      title: '更新了个人简介',
      time: '1 周前',
      description: '完善了关于页面的内容'
    }
  ]
}: RecentActivityModuleProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'post':
        return { icon: FileText, color: 'from-blue-500 to-blue-600' };
      case 'photo':
        return { icon: Camera, color: 'from-purple-500 to-purple-600' };
      case 'milestone':
        return { icon: Trophy, color: 'from-yellow-500 to-yellow-600' };
      case 'update':
        return { icon: Clock, color: 'from-green-500 to-green-600' };
      default:
        return { icon: Heart, color: 'from-pink-500 to-pink-600' };
    }
  };

  return (
    <ScrollReveal delay={0.4}>
      <GlassCard className="h-full">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-apple"
            whileHover={{ scale: 1.05, rotate: -5 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Heart size={22} className="text-white" />
          </motion.div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            最近动态
          </h3>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const { icon: Icon, color } = getActivityIcon(activity.type);

            return (
              <motion.div
                key={activity.id}
                className="group relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-apple-xs flex-shrink-0 group-hover:shadow-apple transition-shadow duration-300`}>
                    <Icon size={18} className="text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {activity.title}
                    </p>
                    {activity.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                        {activity.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {activity.time}
                    </p>
                  </div>

                  {/* 活动指示器 */}
                  <motion.div
                    className="w-2 h-2 bg-orange-400 rounded-full opacity-60 flex-shrink-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                </motion.div>

                {/* 连接线 */}
                {index < activities.length - 1 && (
                  <div className="absolute left-8 top-16 w-px h-4 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 底部装饰 */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-xs text-gray-400 dark:text-gray-500">
            持续更新中...
          </p>
        </motion.div>
      </GlassCard>
    </ScrollReveal>
  );
}