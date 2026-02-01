import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, Tag, MapPin } from 'lucide-react';

const mockPosts = [
  {
    id: '1',
    title: '关于慢生活的思考',
    excerpt: '在这个快节奏的时代，我们总是被各种事务推着向前跑，很少有时间停下来思考生活的意义...',
    category: '生活感悟',
    tags: ['生活', '思考', '慢生活'],
    publishedAt: '2024-01-15',
    readTime: 5,
    location: '北京',
    mood: 'thoughtful' as const,
  },
  {
    id: '2',
    title: '秋日街拍记录',
    excerpt: '今天天气特别好，阳光透过梧桐叶洒在石板路上，忍不住拿起相机记录这美好的瞬间...',
    category: '摄影日记',
    tags: ['摄影', '秋天', '街拍'],
    publishedAt: '2024-01-14',
    readTime: 3,
    location: '上海',
    mood: 'happy' as const,
  },
  {
    id: '3',
    title: '读书笔记：《瓦尔登湖》',
    excerpt: '梭罗在瓦尔登湖畔的简朴生活给了我很多启发，关于自然、关于内心的宁静...',
    category: '读书笔记',
    tags: ['读书', '哲学', '自然'],
    publishedAt: '2024-01-12',
    readTime: 8,
    mood: 'calm' as const,
  },
];

const moodColors = {
  happy: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  thoughtful: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  excited: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  calm: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  melancholy: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};

const moodLabels = {
  happy: '开心',
  thoughtful: '深思',
  excited: '兴奋',
  calm: '平静',
  melancholy: '忧郁',
};

export function JournalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            我的日记
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            记录生活的点点滴滴，分享内心的思考感悟
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">全部</Button>
              <Button variant="ghost" size="sm">生活感悟</Button>
              <Button variant="ghost" size="sm">摄影日记</Button>
              <Button variant="ghost" size="sm">读书笔记</Button>
              <Button variant="ghost" size="sm">旅行记录</Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-6">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <GlassCard hover>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      {post.mood && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${moodColors[post.mood]}`}>
                          {moodLabels[post.mood]}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} 分钟阅读
                      </span>
                      {post.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {post.location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Tag size={14} className="text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      阅读全文
                    </Button>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                    <span className="text-primary-400 text-4xl">📝</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button variant="secondary">
            加载更多文章
          </Button>
        </motion.div>
      </div>
    </div>
  );
}