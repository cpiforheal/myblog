import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { cn } from '@/utils/cn';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: once,
  });

  const directionVariants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      ...directionVariants[direction],
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
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
    >
      {children}
    </motion.div>
  );
}

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