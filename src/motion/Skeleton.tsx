import { motion } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  circle?: boolean;
  count?: number;
  style?: CSSProperties;
}

/**
 * Skeleton: Animated loading skeleton with shimmer effect
 * Shows while content is loading
 */
export function Skeleton({
  width = '100%',
  height = '1rem',
  className,
  circle = false,
  count = 1,
  style,
}: SkeletonProps) {
  const shimmer = {
    initial: { backgroundPosition: '-1000px 0' },
    animate: { backgroundPosition: '1000px 0' },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  const skeletonStyle: CSSProperties = {
    width,
    height,
    borderRadius: circle ? '50%' : '0.375rem',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '1000px 100%',
    ...style,
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          style={skeletonStyle}
          variants={shimmer}
          initial="initial"
          animate="animate"
          className={i > 0 ? 'mt-2' : ''}
        />
      ))}
    </div>
  );
}

export default Skeleton;
