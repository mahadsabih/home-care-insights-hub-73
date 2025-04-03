
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatCardProps) => {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-center justify-between w-full">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              trend.isPositive ? "text-success" : "text-danger"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default StatCard;
