import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'rounded-full border-primary/30 border-t-primary animate-spin-slow',
          sizeClasses[size]
        )}
      />
    </div>
  );
};

interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground animate-pulse-soft">{message}</p>
    </div>
  );
};
