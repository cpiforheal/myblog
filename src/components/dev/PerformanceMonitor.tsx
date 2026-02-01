import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMemoryUsage, getDevicePerformance } from '../../utils/performance';

interface PerformanceStats {
  fps: number;
  memory: ReturnType<typeof getMemoryUsage>;
  devicePerformance: ReturnType<typeof getDevicePerformance>;
  renderTime: number;
  componentCount: number;
}

export const PerformanceMonitor = memo(function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 0,
    memory: null,
    devicePerformance: 'medium',
    renderTime: 0,
    componentCount: 0,
  });

  // FPS 计算
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const calculateFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setStats(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(calculateFPS);
    };

    if (isVisible) {
      calculateFPS();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  // 性能统计更新
  useEffect(() => {
    if (!isVisible) return;

    const updateStats = () => {
      const memory = getMemoryUsage();
      const devicePerformance = getDevicePerformance();

      // 计算渲染时间
      const renderStart = performance.now();
      setTimeout(() => {
        const renderTime = performance.now() - renderStart;

        setStats(prev => ({
          ...prev,
          memory,
          devicePerformance,
          renderTime: Math.round(renderTime * 100) / 100,
          componentCount: document.querySelectorAll('[data-react-component]').length,
        }));
      }, 0);
    };

    const interval = setInterval(updateStats, 1000);
    updateStats();

    return () => clearInterval(interval);
  }, [isVisible]);

  // 键盘快捷键切换显示
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // 只在开发环境显示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value >= thresholds[1]) return 'text-green-500';
    if (value >= thresholds[0]) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMemoryColor = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage < 50) return 'text-green-500';
    if (percentage < 80) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <>
      {/* 切换按钮 */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded-full text-xs font-mono backdrop-blur-sm"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="性能监控 (Ctrl+Shift+P)"
      >
        📊
      </motion.button>

      {/* 性能面板 */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-4 right-4 z-40 bg-black/90 text-white p-4 rounded-lg backdrop-blur-sm font-mono text-sm min-w-[280px]"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">性能监控</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {/* FPS */}
              <div className="flex justify-between">
                <span>FPS:</span>
                <span className={getPerformanceColor(stats.fps, [30, 50])}>
                  {stats.fps}
                </span>
              </div>

              {/* 渲染时间 */}
              <div className="flex justify-between">
                <span>渲染时间:</span>
                <span className={getPerformanceColor(16 - stats.renderTime, [8, 12])}>
                  {stats.renderTime}ms
                </span>
              </div>

              {/* 内存使用 */}
              {stats.memory && (
                <div className="flex justify-between">
                  <span>内存:</span>
                  <span className={getMemoryColor(stats.memory.used, stats.memory.total)}>
                    {stats.memory.used}MB / {stats.memory.total}MB
                  </span>
                </div>
              )}

              {/* 设备性能 */}
              <div className="flex justify-between">
                <span>设备性能:</span>
                <span className={
                  stats.devicePerformance === 'high' ? 'text-green-500' :
                  stats.devicePerformance === 'medium' ? 'text-yellow-500' :
                  'text-red-500'
                }>
                  {stats.devicePerformance}
                </span>
              </div>

              {/* 组件数量 */}
              <div className="flex justify-between">
                <span>组件数:</span>
                <span className="text-blue-400">{stats.componentCount}</span>
              </div>

              {/* 连接信息 */}
              {navigator.connection && (
                <div className="flex justify-between">
                  <span>网络:</span>
                  <span className="text-purple-400">
                    {(navigator.connection as any).effectiveType}
                  </span>
                </div>
              )}
            </div>

            {/* 性能建议 */}
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-xs text-gray-400">
                {stats.fps < 30 && <div className="text-red-400">⚠️ FPS 过低</div>}
                {stats.memory && stats.memory.used / stats.memory.total > 0.8 && (
                  <div className="text-red-400">⚠️ 内存使用过高</div>
                )}
                {stats.renderTime > 16 && (
                  <div className="text-yellow-400">⚠️ 渲染时间过长</div>
                )}
                {stats.devicePerformance === 'low' && (
                  <div className="text-yellow-400">💡 建议减少动画</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

// 性能分析 Hook
export function usePerformanceProfiler(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(
          `🐌 ${componentName} 渲染时间过长: ${renderTime.toFixed(2)}ms`
        );
      }
    };
  });

  // 添加组件标识用于统计
  useEffect(() => {
    const element = document.createElement('div');
    element.setAttribute('data-react-component', componentName);
    element.style.display = 'none';
    document.body.appendChild(element);

    return () => {
      document.body.removeChild(element);
    };
  }, [componentName]);
}

// 性能测试工具
export const PerformanceProfiler = memo<{
  children: React.ReactNode;
  name: string;
}>(function PerformanceProfiler({ children, name }) {
  usePerformanceProfiler(name);
  return <>{children}</>;
});