import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      containerClassName,
      id,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <motion.label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
            animate={{ y: isFocused ? 0 : 0, scale: isFocused ? 0.95 : 1 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          {leftIcon && (
            <motion.div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
              animate={{ color: isFocused ? '#3157F6' : undefined }}
              transition={{ duration: 0.15 }}
            >
              {leftIcon}
            </motion.div>
          )}
          <motion.input
            ref={ref as any}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-lg border border-border bg-surface px-3 text-sm text-text-primary placeholder:text-text-secondary/60 transition-colors duration-200',
              'focus:outline-none',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error',
              className
            )}
            animate={{
              borderColor: isFocused ? '#3157F6' : error ? '#EF4444' : undefined,
              boxShadow: isFocused
                ? '0 0 0 3px rgba(49, 87, 246, 0.1)'
                : error
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                  : '0 0 0 0px rgba(0, 0, 0, 0)',
            }}
            transition={{ duration: 0.15 }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...(props as any)}
          />
          {rightIcon && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
              animate={{ color: isFocused ? '#3157F6' : undefined }}
              transition={{ duration: 0.15 }}
            >
              {rightIcon}
            </motion.div>
          )}
        </div>
        {error && (
          <motion.p
            className="text-xs text-error font-medium"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {error}
          </motion.p>
        )}
        {hint && !error && (
          <motion.p
            className="text-xs text-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {hint}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
