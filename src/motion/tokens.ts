// Motion & Animation Tokens for Premium UI
// All durations, easings, and spring configs in one place

export const durations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
} as const;

export const easing = [0.22, 1, 0.36, 1] as const; // Cubic bezier for smooth feel

export const spring = {
  gentle: {
    stiffness: 260,
    damping: 26,
  },
  bounce: {
    stiffness: 300,
    damping: 10,
  },
} as const;

// Animation Variants
export const variants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: durations.base, ease: easing },
  },

  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: durations.base, ease: easing },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: durations.base, ease: easing },
  },

  scaleInSmall: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: durations.fast, ease: easing },
  },

  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 },
    transition: { duration: durations.base, ease: easing },
  },

  slideDown: {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
    transition: { duration: durations.base, ease: easing },
  },

  slideLeft: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 24 },
    transition: { duration: durations.base, ease: easing },
  },

  slideRight: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
    transition: { duration: durations.base, ease: easing },
  },

  // Stagger container - stagger children with 0.06s delay between each
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  },

  // Stagger item - used with staggerContainer
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: durations.base, ease: easing },
  },

  // Page transitions (fade + slide)
  pageTransitionIn: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: durations.base, ease: easing },
  },

  pageTransitionOut: {
    exit: { opacity: 0, y: 12 },
    transition: { duration: durations.base, ease: easing },
  },
} as const;

// Prefers reduced motion - respect accessibility setting
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Wrapper to disable animations if user prefers reduced motion
export const getTransition = (transition: any) => {
  if (prefersReducedMotion()) {
    return { duration: 0 };
  }
  return transition;
};

export const getVariant = (variant: any) => {
  if (prefersReducedMotion()) {
    return {
      initial: variant.initial,
      animate: variant.animate,
      exit: variant.exit,
      transition: { duration: 0 },
    };
  }
  return variant;
};
