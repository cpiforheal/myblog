import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { AppRoutes, preloadAllRoutes } from './router/AppRoutes';
import { PerformanceMonitor } from './components/ui/PerformanceMonitor';

function App() {
  // 预加载路由
  useEffect(() => {
    // 在组件挂载后预加载其他路由
    const timer = setTimeout(() => {
      preloadAllRoutes();
    }, 2000); // 2秒后开始预加载

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main className="pb-16 md:pb-0">
            <AppRoutes />
          </main>
          <BottomNav />

          {/* 开发环境性能监控 */}
          <PerformanceMonitor />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;