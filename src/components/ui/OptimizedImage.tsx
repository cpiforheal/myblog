import React, { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { lazyLoadImage, getOptimizedAnimationConfig } from '../../utils/performance';
import { cn } from '@/utils/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = memo<OptimizedImageProps>(function OptimizedImage({
  src,
  alt,
  className,
  placeholder,
  blurDataURL,
  width,
  height,
  priority = false,
  onLoad,
  onError,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { ref: containerRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationConfig = getOptimizedAnimationConfig();

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // 如果是优先级图片或已经可见，立即加载
    if (priority || isVisible) {
      lazyLoadImage(img, src, placeholder || blurDataURL)
        .then(() => {
          setIsLoaded(true);
          onLoad?.();
        })
        .catch(() => {
          setIsError(true);
          onError?.();
        });
    }
  }, [src, placeholder, blurDataURL, priority, isVisible, onLoad, onError]);

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 1.05,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: animationConfig.duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {/* 占位符或模糊图片 */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse">
          {blurDataURL && (
            <img
              src={blurDataURL}
              alt=""
              className="w-full h-full object-cover filter blur-sm scale-110"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* 主图片 */}
      <motion.img
        ref={imgRef}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        variants={imageVariants}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/* 错误状态 */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">图片加载失败</p>
          </div>
        </div>
      )}
    </div>
  );
});

// 响应式图片组件
interface ResponsiveImageProps extends OptimizedImageProps {
  srcSet?: string;
  sizes?: string;
}

export const ResponsiveImage = memo<ResponsiveImageProps>(function ResponsiveImage({
  srcSet,
  sizes,
  ...props
}) {
  return (
    <OptimizedImage
      {...props}
      // 扩展 img 元素以支持响应式
      ref={(img) => {
        if (img && srcSet) {
          img.srcset = srcSet;
        }
        if (img && sizes) {
          img.sizes = sizes;
        }
      }}
    />
  );
});

// 头像组件
interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

export const Avatar = memo<AvatarProps>(function Avatar({
  src,
  alt,
  size = 'md',
  className,
  fallback,
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={cn('relative rounded-full overflow-hidden', sizeClasses[size], className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full"
        placeholder={fallback}
        priority
      />
    </div>
  );
});