
import React from 'react';
import { FileText, AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ActivityEntry {
  id: string;
  type: 'complaint' | 'incident' | 'safeguarding' | 'missed-visit';
  priority: 'high' | 'medium' | 'low';
  subject: string;
  client: string;
  date: string;
}

const ActivityLogSummary = () => {
  // Mock data for activity log
  const activities: ActivityEntry[] = [
    {
      id: '1',
      type: 'incident',
      priority: 'high',
      subject: 'Medication Error',
      client: 'Robert Smith',
      date: '2023-04-03'
    },
    {
      id: '2',
      type: 'complaint',
      priority: 'medium',
      subject: 'Care Quality Concern',
      client: 'Emily Johnson',
      date: '2023-04-02'
    },
    {
      id: '3',
      type: 'safeguarding',
      priority: 'high',
      subject: 'Possible Neglect',
      client: 'William Davis',
      date: '2023-04-01'
    },
    {
      id: '4',
      type: 'missed-visit',
      priority: 'medium',
      subject: 'No Staff Available',
      client: 'Patricia Wilson',
      date: '2023-03-31'
    }
  ];

  // Helper function for type icon
  const getTypeIcon = (type: ActivityEntry['type']) => {
    switch(type) {
      case 'complaint':
        return <FileText className="h-4 w-4 text-warning" />;
      case 'incident':
        return <AlertCircle className="h-4 w-4 text-danger" />;
      case 'safeguarding':
        return <AlertTriangle className="h-4 w-4 text-danger" />;
      case 'missed-visit':
        return <FileText className="h-4 w-4 text-info" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Helper function for type label
  const getTypeLabel = (type: ActivityEntry['type']) => {
    switch(type) {
      case 'complaint':
        return <span className="badge bg-warning/10 text-warning">Complaint</span>;
      case 'incident':
        return <span className="badge bg-danger/10 text-danger">Incident</span>;
      case 'safeguarding':
        return <span className="badge bg-danger/10 text-danger">Safeguarding</span>;
      case 'missed-visit':
        return <span className="badge bg-info/10 text-info">Missed Visit</span>;
      default:
        return <span className="badge bg-muted">Unknown</span>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold">Activity Log</CardTitle>
          <p className="text-sm text-muted-foreground">8 new entries since your last login</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start p-3 rounded-md bg-muted/50 relative">
              <div className="mr-3 mt-0.5">
                {getTypeIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-1">
                  {getTypeLabel(activity.type)}
                  {activity.priority === 'high' && (
                    <span className="badge bg-danger/10 text-danger">High Priority</span>
                  )}
                </div>
                <p className="text-sm font-medium truncate">{activity.subject}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Client: {activity.client}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full">
          View Full Activity Log
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityLogSummary;
