import React, { memo, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Clock, Eye } from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  componentCount: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showDetails?: boolean;
}

export const PerformanceMonitor = memo(function PerformanceMonitor({
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-right',
  showDetails = false
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    componentCount: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [lastTime, setLastTime] = useState(performance.now());
  const [frameCount, setFrameCount] = useState(0);

  // FPS 计算
  const calculateFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTime;

    if (delta >= 1000) {
      const fps = Math.round((frameCount * 1000) / delta);
      setMetrics(prev => ({ ...prev, fps }));
      setLastTime(now);
      setFrameCount(0);
    } else {
      setFrameCount(prev => prev + 1);
    }
  }, [lastTime, frameCount]);

  // 内存使用情况
  const updateMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      setMetrics(prev => ({ ...prev, memoryUsage: usedMB }));
    }
  }, []);

  // 渲染时间监控
  const measureRenderTime = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const renderEntries = entries.filter(entry =>
        entry.entryType === 'measure' && entry.name.includes('React')
      );

      if (renderEntries.length > 0) {
        const avgRenderTime = renderEntries.reduce((sum, entry) =>
          sum + entry.duration, 0) / renderEntries.length;
        setMetrics(prev => ({ ...prev, renderTime: Math.round(avgRenderTime) }));
      }
    });

    observer.observe({ entryTypes: ['measure'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let animationFrame: number;
    let memoryInterval: NodeJS.Timeout;
    let renderCleanup: (() => void) | undefined;

    const animate = () => {
      calculateFPS();
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    memoryInterval = setInterval(updateMemoryUsage, 2000);
    renderCleanup = measureRenderTime();

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(memoryInterval);
      renderCleanup?.();
    };
  }, [enabled, calculateFPS, updateMemoryUsage, measureRenderTime]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4';
    }
  };

  const getFPSColor = () => {
    if (metrics.fps >= 55) return 'text-green-500';
    if (metrics.fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMemoryColor = () => {
    if (metrics.memoryUsage < 50) return 'text-green-500';
    if (metrics.memoryUsage < 100) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (!enabled) return null;

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      <motion.div
        className="bg-black/80 backdrop-blur-sm text-white rounded-lg p-3 font-mono text-xs shadow-lg border border-gray-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onHoverStart={() => setIsVisible(true)}
        onHoverEnd={() => setIsVisible(false)}
      >
        <div className="flex items-center gap-2 mb-2">
          <Activity size={14} className="text-blue-400" />
          <span className="text-gray-300">性能监控</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1">
              <Zap size={12} />
              FPS:
            </span>
            <span className={getFPSColor()}>{metrics.fps}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              内存:
            </span>
            <span className={getMemoryColor()}>{metrics.memoryUsage}MB</span>
          </div>

          <AnimatePresence>
            {(isVisible || showDetails) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1 pt-2 border-t border-gray-600"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    渲染:
                  </span>
                  <span className="text-blue-400">{metrics.renderTime}ms</span>
                </div>

                <div className="text-gray-400 text-[10px] mt-2">
                  悬停查看详情
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
});