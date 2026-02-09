import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOptimizedAnimationConfig } from '../utils/performance';

// 懒加载页面组件
const Home = lazy(() => import('../pages/HomePage'));
const Blog = lazy(() => import('../pages/BlogPage'));
const Diary = lazy(() => import('../pages/JournalPage'));
const Gallery = lazy(() => import('../pages/GalleryPage'));
const About = lazy(() => import('../pages/AboutPage'));
const Guestbook = lazy(() => import('../pages/GuestbookPage'));

// 加载中组件
const LoadingSpinner = () => {
  const animationConfig = getOptimizedAnimationConfig();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationConfig.duration }}
      >
        {/* 苹果风格的加载动画 */}
        <div className="relative">
          <motion.div
            className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: animationConfig.duration }}
        >
          加载中...
        </motion.p>
      </motion.div>
    </div>
  );
};

// 错误边界组件
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('路由加载错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">😵</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              页面加载失败
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {this.state.error?.message || '未知错误'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 页面过渡动画
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const animationConfig = getOptimizedAnimationConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: animationConfig.duration,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// 路由配置
export const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageTransition>
                <Home />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageTransition>
                <Blog />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/journal"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageTransition>
                <Diary />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/gallery"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageTransition>
                <Gallery />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageTransition>
                <About />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/guestbook"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageTransition>
                <Guestbook />
              </PageTransition>
            </Suspense>
          }
        />
        {/* 404 页面 */}
        <Route
          path="*"
          element={
            <PageTransition>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl">🤔</div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    页面未找到
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    您访问的页面不存在
                  </p>
                  <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    返回上一页
                  </button>
                </div>
              </div>
            </PageTransition>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
};

// 预加载工具
export const preloadRoute = (routeImport: () => Promise<any>) => {
  // 在空闲时间预加载
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      routeImport();
    });
  } else {
    // 降级到 setTimeout
    setTimeout(() => {
      routeImport();
    }, 100);
  }
};

// 预加载所有路由
export const preloadAllRoutes = () => {
  preloadRoute(() => import('../pages/BlogPage'));
  preloadRoute(() => import('../pages/JournalPage'));
  preloadRoute(() => import('../pages/GalleryPage'));
  preloadRoute(() => import('../pages/AboutPage'));
  preloadRoute(() => import('../pages/GuestbookPage'));
};