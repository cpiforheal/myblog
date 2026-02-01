import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Mail,
  Github,
  Twitter,
  Instagram,
  Calendar,
  BookOpen,
  Camera,
  Coffee,
  Music,
  Plane,
  Code
} from 'lucide-react';

const skills = [
  { name: '摄影', level: 85, icon: Camera },
  { name: '写作', level: 90, icon: BookOpen },
  { name: '编程', level: 75, icon: Code },
  { name: '旅行', level: 80, icon: Plane },
];

const timeline = [
  {
    year: '2024',
    title: '开始写博客',
    description: '创建了这个个人博客，开始记录生活和思考',
  },
  {
    year: '2023',
    title: '学习摄影',
    description: '开始系统学习摄影技巧，用镜头记录生活美好',
  },
  {
    year: '2022',
    title: '热爱旅行',
    description: '走过了很多城市，体验不同的文化和风景',
  },
  {
    year: '2021',
    title: '开始编程',
    description: '踏入编程世界，享受创造的乐趣',
  },
];

const interests = [
  { name: '咖啡', icon: Coffee, color: 'bg-amber-500' },
  { name: '音乐', icon: Music, color: 'bg-purple-500' },
  { name: '旅行', icon: Plane, color: 'bg-blue-500' },
  { name: '摄影', icon: Camera, color: 'bg-green-500' },
  { name: '阅读', icon: BookOpen, color: 'bg-red-500' },
  { name: '编程', icon: Code, color: 'bg-indigo-500' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-6">
            <motion.img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="头像"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white text-sm">👋</span>
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            你好，我是
            <span className="text-gradient ml-2">张三</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            一个热爱生活、喜欢记录的普通人
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              北京，中国
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              2024年加入
            </span>
          </div>
        </motion.div>

        {/* About Me */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              关于我
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                我是一个对生活充满好奇心的人，喜欢用文字记录思考，用镜头捕捉美好。
                在这个快节奏的时代，我希望能够慢下来，仔细观察身边的世界，
                发现那些容易被忽略的美好瞬间。
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                我相信每个人都有自己独特的故事，而这个博客就是我分享故事的地方。
                无论是日常生活的感悟，还是旅行途中的见闻，或是读书时的思考，
                我都希望能够通过文字和图片与你分享。
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                如果你也喜欢记录生活，欢迎与我交流。让我们一起在这个数字世界里，
                创造属于自己的小小花园。
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Skills */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              技能与爱好
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                    <skill.icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-primary-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Interests */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              兴趣爱好
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-8 h-8 ${interest.color} rounded-lg flex items-center justify-center`}>
                    <interest.icon size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {interest.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              我的时间线
            </h2>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.year.slice(-2)}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-700 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              联系我
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              如果你想与我交流，欢迎通过以下方式联系我：
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" className="flex items-center gap-2">
                <Mail size={16} />
                邮箱
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <Github size={16} />
                GitHub
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <Twitter size={16} />
                Twitter
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <Instagram size={16} />
                Instagram
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}