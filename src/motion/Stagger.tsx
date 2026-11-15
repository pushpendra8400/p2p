import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { variants, getVariant } from './tokens';

interface StaggerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
  margin?: string;
}

/**
 * Stagger: Container that staggers children animations with 0.06s delay between each
 * Children should be direct JSX elements (motion.div will auto-wrap)
 */
export function Stagger({
  children,
  delay = 0,
  staggerDelay = 0.06,
  className,
  once = true,
  amount = 'some',
  margin = '-80px',
}: StaggerProps) {
  const containerVariant = getVariant({
    ...variants.staggerContainer,
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  });

  const itemVariant = getVariant(variants.staggerItem);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, amount: amount as any, margin }}
      variants={containerVariant as any}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={itemVariant as any}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

export default Stagger;
