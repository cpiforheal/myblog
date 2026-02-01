import { Variants } from 'framer-motion';

// 微交互动画配置
export const microInteractions = {
  // 卡片悬停效果
  cardHover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 按钮点击效果
  buttonTap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 图标旋转效果
  iconRotate: {
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 脉冲效果
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 弹跳效果
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 摇摆效果
  wiggle: {
    rotate: [-3, 3, -3, 3, 0],
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 渐入效果
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 滑入效果
  slideIn: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  // 缩放进入效果
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// 交错动画变体
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// 页面过渡动画
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

// 模态框动画
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// 背景遮罩动画
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// 创建带有延迟的动画
export const createDelayedAnimation = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    delay,
    ease: [0.4, 0, 0.2, 1]
  }
});

// 创建悬停动画
export const createHoverAnimation = (scale: number = 1.05) => ({
  whileHover: {
    scale,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  whileTap: {
    scale: scale * 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1]
    }
  }
});

// 创建加载动画
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// 创建打字机效果
export const typewriterVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
};