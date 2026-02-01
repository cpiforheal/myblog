// 性能优化工具函数

/**
 * 防抖函数 - 延迟执行，在指定时间内多次调用只执行最后一次
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
}

/**
 * 节流函数 - 限制执行频率，在指定时间内最多执行一次
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 请求动画帧节流 - 使用 requestAnimationFrame 优化动画性能
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function executedFunction(...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...args);
        rafId = null;
      });
    }
  };
}

/**
 * 懒加载图片
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  placeholder?: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      resolve();
    };

    image.onerror = reject;

    if (placeholder) {
      img.src = placeholder;
    }

    image.src = src;
  });
}

/**
 * 预加载图片
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(url =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      })
    )
  );
}

/**
 * 检测设备性能等级
 */
export function getDevicePerformance(): 'low' | 'medium' | 'high' {
  // 检测硬件并发数
  const cores = navigator.hardwareConcurrency || 4;

  // 检测内存（如果可用）
  const memory = (navigator as any).deviceMemory || 4;

  // 检测连接类型
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType || '4g';

  if (cores <= 2 || memory <= 2 || effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'low';
  } else if (cores <= 4 || memory <= 4 || effectiveType === '3g') {
    return 'medium';
  } else {
    return 'high';
  }
}

/**
 * 根据设备性能调整动画配置
 */
export function getOptimizedAnimationConfig() {
  const performance = getDevicePerformance();

  switch (performance) {
    case 'low':
      return {
        duration: 0.3,
        staggerDelay: 0.05,
        enableBlur: false,
        enableShadow: false,
        reducedMotion: true
      };
    case 'medium':
      return {
        duration: 0.5,
        staggerDelay: 0.08,
        enableBlur: true,
        enableShadow: false,
        reducedMotion: false
      };
    case 'high':
    default:
      return {
        duration: 0.6,
        staggerDelay: 0.1,
        enableBlur: true,
        enableShadow: true,
        reducedMotion: false
      };
  }
}

/**
 * 检测用户是否偏好减少动画
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 虚拟滚动工具类
 */
export class VirtualScroller {
  private container: HTMLElement;
  private itemHeight: number;
  private visibleCount: number;
  private totalCount: number;
  private scrollTop = 0;
  private startIndex = 0;
  private endIndex = 0;

  constructor(
    container: HTMLElement,
    itemHeight: number,
    totalCount: number
  ) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.totalCount = totalCount;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
    this.updateVisibleRange();
  }

  private updateVisibleRange() {
    this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
    this.endIndex = Math.min(
      this.startIndex + this.visibleCount,
      this.totalCount
    );
  }

  onScroll(scrollTop: number) {
    this.scrollTop = scrollTop;
    this.updateVisibleRange();
  }

  getVisibleRange() {
    return {
      start: this.startIndex,
      end: this.endIndex,
      offsetY: this.startIndex * this.itemHeight
    };
  }
}

/**
 * 内存使用监控
 */
export function getMemoryUsage() {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };
  }
  return null;
}