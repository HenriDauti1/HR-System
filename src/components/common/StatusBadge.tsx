import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const variantStyles = {
  default: 'bg-secondary text-secondary-foreground',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning-foreground border border-warning/20',
  error: 'bg-destructive/10 text-destructive border border-destructive/20',
  info: 'bg-info/10 text-info border border-info/20',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'default',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {status}
    </span>
  );
};

// Auto-detect variant based on common status patterns
export const AutoStatusBadge: React.FC<{ status: string; className?: string }> = ({
  status,
  className,
}) => {
  const statusLower = status.toLowerCase();
  
  let variant: StatusBadgeProps['variant'] = 'default';
  
  if (
    statusLower.includes('active') ||
    statusLower.includes('approved') ||
    statusLower.includes('ok') ||
    statusLower.includes('success') ||
    statusLower.includes('paid')
  ) {
    variant = 'success';
  } else if (
    statusLower.includes('warning') ||
    statusLower.includes('pending') ||
    statusLower.includes('low')
  ) {
    variant = 'warning';
  } else if (
    statusLower.includes('critical') ||
    statusLower.includes('error') ||
    statusLower.includes('expired') ||
    statusLower.includes('overused') ||
    statusLower.includes('depleted')
  ) {
    variant = 'error';
  } else if (
    statusLower.includes('info') ||
    statusLower.includes('notice')
  ) {
    variant = 'info';
  }
  
  return <StatusBadge status={status} variant={variant} className={className} />;
};
