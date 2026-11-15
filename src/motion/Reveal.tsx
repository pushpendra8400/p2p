import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { variants, getVariant } from './tokens';

interface RevealProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
  margin?: string;
  asChild?: boolean;
}

/**
 * Reveal: Animated container that reveals children on mount or scroll
 * Respects prefers-reduced-motion
 */
export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  className,
  once = true,
  amount = 'some',
  margin = '-80px',
}: RevealProps) {
  const variantConfig = variants[variant as keyof typeof variants];
  const safeVariant = getVariant(variantConfig);

  return (
    <motion.div
      initial={safeVariant.initial}
      whileInView={safeVariant.animate}
      exit={safeVariant.exit}
      transition={{
        ...safeVariant.transition,
        delay,
        ...(duration && { duration }),
      }}
      viewport={{ once, amount: amount as any, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
