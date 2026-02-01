import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getOptimizedAnimationConfig, prefersReducedMotion } from '../../utils/performance';
import { cn } from '@/utils/cn';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
  disabled?: boolean;
  threshold?: number;
}

export const ScrollReveal = memo<ScrollRevealProps>(function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration,
  once = true,
  disabled = false,
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: once,
    delay,
  });

  // 获取优化的动画配置
  const animationConfig = getOptimizedAnimationConfig();
  const shouldReduceMotion = prefersReducedMotion() || animationConfig.reducedMotion;

  // 如果禁用动画或用户偏好减少动画，直接渲染内容
  if (disabled || shouldReduceMotion) {
    return <div className={cn('opacity-100', className)}>{children}</div>;
  }

  const finalDuration = duration ?? animationConfig.duration;

  const directionVariants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      ...directionVariants[direction],
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: finalDuration,
        ease: [0.4, 0, 0.2, 1],
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      // 性能优化：动画完成后移除 will-change
      style={{
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
    >
      {children}
    </motion.div>
  );
});

// 预设的滚动动画组件
export function FadeInUp({ children, className, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollReveal className={className} delay={delay} direction="up">
      {children}
    </ScrollReveal>
  );
}

export function FadeInLeft({ children, className, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollReveal className={className} delay={delay} direction="left">
      {children}
    </ScrollReveal>
  );
}

export function FadeInRight({ children, className, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollReveal className={className} delay={delay} direction="right">
      {children}
    </ScrollReveal>
  );
}