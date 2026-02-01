import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { BookOpen, Camera, TrendingUp, Clock, MapPin, Heart } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-6">
            <motion.img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="头像"
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            欢迎来到我的
            <span className="text-gradient ml-2">数字花园</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            记录生活点滴，分享思考感悟，用文字和影像编织属于自己的故事
          </p>
        </motion.section>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Latest Journal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <GlassCard hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      最新日记
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      2 小时前
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                  生活感悟
                </span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                关于慢生活的思考
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                在这个快节奏的时代，我们总是被各种事务推着向前跑，很少有时间停下来思考生活的意义。今天在公园里看到一位老人悠闲地喂鸽子，突然意识到...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    5 分钟阅读
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    北京
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  阅读更多
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  创作统计
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">文章</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    24 篇
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">照片</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    156 张
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">创作年限</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    2 年
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Gallery Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard hover className="h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Camera size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  精选照片
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop`}
                      alt={`照片 ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                查看更多
              </Button>
            </GlassCard>
          </motion.div>

          {/* Recent Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Heart size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  最近动态
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  { type: 'post', title: '发布了新文章《关于慢生活的思考》', time: '2 小时前' },
                  { type: 'photo', title: '上传了 5 张秋日街拍照片', time: '1 天前' },
                  { type: 'milestone', title: '博客访问量突破 10,000 次', time: '3 天前' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}