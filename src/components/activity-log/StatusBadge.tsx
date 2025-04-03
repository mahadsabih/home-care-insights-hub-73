
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Clock, Loader2, CheckCircle, XCircle
} from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'open':
        return {
          label: 'Open',
          icon: Clock,
          bgClass: 'bg-blue-100 text-blue-700 border-blue-200',
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          icon: Loader2,
          bgClass: 'bg-amber-100 text-amber-700 border-amber-200',
        };
      case 'resolved':
        return {
          label: 'Resolved',
          icon: CheckCircle,
          bgClass: 'bg-green-100 text-green-700 border-green-200',
        };
      case 'closed':
        return {
          label: 'Closed',
          icon: XCircle,
          bgClass: 'bg-gray-100 text-gray-700 border-gray-200',
        };
      default:
        return {
          label: 'Unknown',
          icon: Clock,
          bgClass: 'bg-gray-100 text-gray-700 border-gray-200',
        };
    }
  };

  const { label, icon: Icon, bgClass } = getStatusConfig();

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

export default StatusBadge;
