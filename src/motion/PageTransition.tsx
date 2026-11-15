import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { durations, easing, getVariant, variants } from './tokens';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * PageTransition: Wraps entire page with fade + slide-up animation
 * Combine with <AnimatePresence> for exit animations
 */
export function PageTransition({ children, className, delay = 0 }: PageTransitionProps) {
  const variant = getVariant(variants.pageTransitionIn);

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{
        ...variant.transition,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
