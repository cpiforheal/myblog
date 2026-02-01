import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

// 全局 IntersectionObserver 实例缓存
const observerCache = new Map<string, IntersectionObserver>();

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  delay = 0
}: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // 创建观察器配置的缓存键
  const observerKey = useMemo(() =>
    `${threshold}-${rootMargin}-${triggerOnce}`,
    [threshold, rootMargin, triggerOnce]
  );

  // 优化的回调函数，使用 useCallback 避免重复创建
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(true);
        }, delay);
      } else {
        setIsVisible(true);
      }

      if (triggerOnce && ref.current) {
        const observer = observerCache.get(observerKey);
        observer?.unobserve(ref.current);
      }
    } else if (!triggerOnce) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    }
  }, [delay, triggerOnce, observerKey]);

  useEffect(() => {
    // 复用或创建 IntersectionObserver
    let observer = observerCache.get(observerKey);
    if (!observer) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });
      observerCache.set(observerKey, observer);
    }

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observer) {
        observer.unobserve(currentRef);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [observerKey, handleIntersection, threshold, rootMargin]);

  return { ref, isVisible };
}

// 预设动画变体
export const scrollAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const staggeredAnimationVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const childAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};