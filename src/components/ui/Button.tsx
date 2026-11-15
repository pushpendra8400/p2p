import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-sm hover:shadow-md',
        secondary:
          'bg-primary/10 text-primary hover:bg-primary/20 focus:ring-primary',
        outline:
          'border border-border bg-transparent text-text-primary hover:bg-bg focus:ring-primary',
        ghost:
          'bg-transparent text-text-primary hover:bg-bg focus:ring-primary',
        danger:
          'bg-error text-white hover:bg-red-600 focus:ring-error shadow-sm hover:shadow-md',
        accent:
          'bg-accent text-white hover:bg-accent-dark focus:ring-accent shadow-sm hover:shadow-md',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref as any}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        transition={{ duration: 0.15 }}
        {...(props as any)}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="h-4 w-4" />
          </motion.div>
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
