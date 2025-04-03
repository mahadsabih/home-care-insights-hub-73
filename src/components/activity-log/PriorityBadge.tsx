
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ArrowDown, ArrowRight, ArrowUp, AlertTriangle
} from 'lucide-react';

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const getPriorityConfig = () => {
    switch (priority) {
      case 'low':
        return {
          label: 'Low',
          icon: ArrowDown,
          bgClass: 'bg-blue-100 text-blue-700 border-blue-200',
        };
      case 'medium':
        return {
          label: 'Medium',
          icon: ArrowRight,
          bgClass: 'bg-amber-100 text-amber-700 border-amber-200',
        };
      case 'high':
        return {
          label: 'High',
          icon: ArrowUp,
          bgClass: 'bg-orange-100 text-orange-700 border-orange-200',
        };
      case 'critical':
        return {
          label: 'Critical',
          icon: AlertTriangle,
          bgClass: 'bg-red-100 text-red-700 border-red-200',
        };
      default:
        return {
          label: 'Unknown',
          icon: ArrowRight,
          bgClass: 'bg-gray-100 text-gray-700 border-gray-200',
        };
    }
  };

  const { label, icon: Icon, bgClass } = getPriorityConfig();

  return (
    <div className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", 
      bgClass,
      className
    )}>
      <Icon className="mr-1 h-3 w-3" />
      <span>{label}</span>
    </div>
  );
};

export default PriorityBadge;
