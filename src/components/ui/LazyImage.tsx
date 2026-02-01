import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { debounce } from '@/utils/performance';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  quality?: 'low' | 'medium' | 'high';
  enableBlur?: boolean;
}

export const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = '',
  placeholder,
  width,
  height,
  onLoad,
  onError,
  threshold = 0.1,
  quality = 'medium',
  enableBlur = true
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 生成不同质量的图片 URL
  const getOptimizedSrc = useCallback((originalSrc: string, targetQuality: string) => {
    // 如果是 Unsplash 图片，添加质量参数
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      switch (targetQuality) {
        case 'low':
          url.searchParams.set('q', '50');
          url.searchParams.set('fm', 'webp');
          break;
        case 'medium':
          url.searchParams.set('q', '75');
          url.searchParams.set('fm', 'webp');
          break;
        case 'high':
          url.searchParams.set('q', '90');
          url.searchParams.set('fm', 'webp');
          break;
      }
      return url.toString();
    }
    return originalSrc;
  }, []);

  // 生成占位符图片
  const getPlaceholderSrc = useCallback(() => {
    if (placeholder) return placeholder;

    // 生成低质量占位符
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      url.searchParams.set('w', '50');
      url.searchParams.set('q', '10');
      url.searchParams.set('blur', '5');
      return url.toString();
    }

    // 默认占位符
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui">
          加载中...
        </text>
      </svg>
    `)}`;
  }, [placeholder, src, width, height]);

  // 防抖的图片加载处理
  const debouncedHandleLoad = useCallback(
    debounce(() => {
      setIsLoaded(true);
      onLoad?.();
    }, 100),
    [onLoad]
  );

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Intersection Observer 设置
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    observerRef.current.observe(img);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold]);

  // 预加载高质量图片
  useEffect(() => {
    if (!isInView || hasError) return;

    const img = new Image();
    img.onload = debouncedHandleLoad;
    img.onerror = handleError;
    img.src = getOptimizedSrc(src, quality);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isInView, src, quality, debouncedHandleLoad, handleError, getOptimizedSrc, hasError]);

  const containerClasses = `
    relative overflow-hidden
    ${className}
  `.trim();

  const imageClasses = `
    w-full h-full object-cover transition-all duration-500
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    ${enableBlur && !isLoaded ? 'blur-sm' : ''}
  `.trim();

  const placeholderClasses = `
    absolute inset-0 w-full h-full object-cover transition-all duration-500
    ${isLoaded ? 'opacity-0' : 'opacity-100'}
    ${enableBlur ? 'blur-sm' : ''}
  `.trim();

  if (hasError) {
    return (
      <div className={containerClasses}>
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 text-sm">图片加载失败</span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* 占位符图片 */}
      <img
        src={getPlaceholderSrc()}
        alt=""
        className={placeholderClasses}
        aria-hidden="true"
      />

      {/* 主图片 */}
      <motion.img
        ref={imgRef}
        src={isInView ? getOptimizedSrc(src, quality) : undefined}
        alt={alt}
        className={imageClasses}
        width={width}
        height={height}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* 加载指示器 */}
      {!isLoaded && isInView && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </div>
  );
});