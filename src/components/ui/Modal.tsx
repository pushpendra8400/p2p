import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-3xl',
};

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  size = 'md',
  showClose = true,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        </motion.div>
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'w-[calc(100%-2rem)] rounded-2xl bg-surface shadow-xl',
            'focus:outline-none',
            sizeClasses[size],
            className
          )}
          asChild
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {(title || showClose) && (
              <div className="flex items-start justify-between gap-4 p-6 pb-0">
                <div className="flex-1">
                  {title && (
                    <Dialog.Title className="text-lg font-semibold text-text-primary">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="mt-1 text-sm text-text-secondary">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {showClose && (
                  <Dialog.Close asChild>
                    <motion.button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-bg hover:text-text-primary transition-colors cursor-pointer"
                      aria-label="Close"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </Dialog.Close>
                )}
              </div>
            )}
            <div className="p-6">{children}</div>
            {footer && (
              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.displayName = 'Modal';

export { Modal };
