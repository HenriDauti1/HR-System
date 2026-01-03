import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, AlertTriangle, Info, XCircle, Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
  showIcon?: boolean;
}

const variantStyles = {
  default: 'bg-secondary/80 text-secondary-foreground border-secondary/40',
  success: 'bg-success/15 text-success border-success/30 shadow-sm',
  warning: 'bg-warning/15 text-warning-foreground border-warning/30 shadow-sm',
  error: 'bg-destructive/15 text-destructive border-destructive/30 shadow-sm',
  info: 'bg-info/15 text-info border-info/30 shadow-sm',
};

const iconMap = {
  default: Circle,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'default',
  className,
  showIcon = true,
}) => {
  const Icon = iconMap[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm transition-all duration-200 hover:scale-105',
        variantStyles[variant],
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{status}</span>
    </span>
  );
};

// Auto-detect variant based on common status patterns
export const AutoStatusBadge: React.FC<{ status: string; className?: string; showIcon?: boolean }> = ({
  status,
  className,
  showIcon = true,
}) => {
  const statusLower = status.toLowerCase();
  
  let variant: StatusBadgeProps['variant'] = 'default';
  
  if (
    statusLower.includes('active') ||
    statusLower.includes('approved') ||
    statusLower.includes('ok') ||
    statusLower.includes('success') ||
    statusLower.includes('paid') ||
    statusLower.includes('complete')
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
    statusLower.includes('depleted') ||
    statusLower.includes('inactive')
  ) {
    variant = 'error';
  } else if (
    statusLower.includes('info') ||
    statusLower.includes('notice')
  ) {
    variant = 'info';
  }
  
  return <StatusBadge status={status} variant={variant} className={className} showIcon={showIcon} />;
};