
import React from 'react';
import { 
  Calendar, 
  UserPlus, 
  Users, 
  Plus, 
  MessageSquare, 
  ClipboardList,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
  const actions = [
    {
      id: '1',
      label: 'Create Shift',
      icon: Clock,
      variant: 'default' as const,
    },
    {
      id: '2',
      label: 'View Roster',
      icon: Calendar,
      variant: 'outline' as const,
    },
    {
      id: '3',
      label: 'Add Client',
      icon: UserPlus,
      variant: 'outline' as const,
    },
    {
      id: '4',
      label: 'Add Staff',
      icon: Users,
      variant: 'outline' as const,
    },
    {
      id: '5',
      label: 'Send Message',
      icon: MessageSquare,
      variant: 'outline' as const,
    },
    {
      id: '6',
      label: 'Add Report',
      icon: ClipboardList,
      variant: 'outline' as const,
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {actions.map((action) => (
            <Button 
              key={action.id} 
              variant={action.variant}
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
