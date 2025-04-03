
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AlertCircle, MessageSquare, ThumbsUp, X, Calendar, 
  Pill, HeartPulse, Shield, Users, User, FileText, File
} from 'lucide-react';

interface LogTypeTagProps {
  type: string;
  className?: string;
}

const LogTypeTag = ({ type, className }: LogTypeTagProps) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'complaint':
        return {
          label: 'Complaint',
          icon: AlertCircle,
          bgClass: 'bg-red-100 text-red-700 border-red-200',
        };
      case 'praise':
        return {
          label: 'Praise',
          icon: ThumbsUp,
          bgClass: 'bg-green-100 text-green-700 border-green-200',
        };
      case 'concern':
        return {
          label: 'Concern',
          icon: AlertCircle,
          bgClass: 'bg-amber-100 text-amber-700 border-amber-200',
        };
      case 'missed-visit':
        return {
          label: 'Missed Visit',
          icon: X,
          bgClass: 'bg-orange-100 text-orange-700 border-orange-200',
        };
      case 'medication-error':
        return {
          label: 'Med Error',
          icon: Pill,
          bgClass: 'bg-rose-100 text-rose-700 border-rose-200',
        };
      case 'accident':
        return {
          label: 'Accident',
          icon: HeartPulse,
          bgClass: 'bg-pink-100 text-pink-700 border-pink-200',
        };
      case 'safeguarding':
        return {
          label: 'Safeguarding',
          icon: Shield,
          bgClass: 'bg-purple-100 text-purple-700 border-purple-200',
        };
      case 'client-communication':
        return {
          label: 'Client Comm',
          icon: User,
          bgClass: 'bg-blue-100 text-blue-700 border-blue-200',
        };
      case 'family-communication':
        return {
          label: 'Family Comm',
          icon: Users,
          bgClass: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        };
      case 'staff-note':
        return {
          label: 'Staff Note',
          icon: FileText,
          bgClass: 'bg-slate-100 text-slate-700 border-slate-200',
        };
      default:
        return {
          label: 'General',
          icon: File,
          bgClass: 'bg-gray-100 text-gray-700 border-gray-200',
        };
    }
  };

  const { label, icon: Icon, bgClass } = getTypeConfig();

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

export default LogTypeTag;
