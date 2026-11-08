import React from 'react';
import { cn } from '@/lib/utils';
import {
  Clock,
  CheckCircle2,
  XCircle,
  CircleDot,
  CreditCard,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
type PaymentStatus = 'paid' | 'pending' | 'refunded';
type SessionStatus = 'waiting' | 'active' | 'completed';

type StatusType = BookingStatus | PaymentStatus | SessionStatus;

interface StatusConfig {
  label: string;
  className: string;
  icon: React.ReactNode;
}

const statusMap: Record<StatusType, StatusConfig> = {
  upcoming: {
    label: 'Upcoming',
    className: 'bg-blue-50 text-blue-600',
    icon: <Clock className="h-3 w-3" />,
  },
  active: {
    label: 'Active',
    className: 'bg-success/10 text-success',
    icon: <CircleDot className="h-3 w-3" />,
  },
  completed: {
    label: 'Completed',
    className: 'bg-gray-100 text-gray-600',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-error/10 text-error',
    icon: <XCircle className="h-3 w-3" />,
  },
  paid: {
    label: 'Paid',
    className: 'bg-success/10 text-success',
    icon: <CreditCard className="h-3 w-3" />,
  },
  pending: {
    label: 'Pending',
    className: 'bg-warning/10 text-warning',
    icon: <AlertCircle className="h-3 w-3" />,
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-error/10 text-error',
    icon: <RotateCcw className="h-3 w-3" />,
  },
  waiting: {
    label: 'Waiting',
    className: 'bg-warning/10 text-warning',
    icon: <Clock className="h-3 w-3" />,
  },
};

export interface StatusBadgeProps {
  status: StatusType;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md',
  className,
}) => {
  const config = statusMap[status];

  if (!config) {
    return null;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        config.className,
        className
      )}
    >
      {showIcon && config.icon}
      {config.label}
    </span>
  );
};

StatusBadge.displayName = 'StatusBadge';

export { StatusBadge };
