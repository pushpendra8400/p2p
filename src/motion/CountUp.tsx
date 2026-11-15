import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect as reactUseEffect } from 'react';
import { durations } from './tokens';

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  format?: (value: number) => string;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
  margin?: string;
}

/**
 * CountUp: Animates number counting from 'from' to 'to'
 * Useful for stats, earnings, metrics
 */
export function CountUp({
  from = 0,
  to,
  duration = durations.slow,
  delay = 0,
  format = (v) => Math.round(v).toString(),
  className,
  once = true,
  amount = 'some',
  margin = '-80px',
}: CountUpProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => format(Number(latest)));

  reactUseEffect(() => {
    const animation = (count as any).animate(to, {
      duration,
      delay,
      ease: 'easeOut',
    });

    return () => {
      if (animation && typeof animation === 'object' && 'stop' in animation) {
        animation.stop();
      }
    };
  }, [count, to, duration, delay]);

  return (
    <motion.span
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      viewport={{ once, amount: amount as any, margin }}
      className={className}
    >
      {rounded as any}
    </motion.span>
  );
}

export default CountUp;
