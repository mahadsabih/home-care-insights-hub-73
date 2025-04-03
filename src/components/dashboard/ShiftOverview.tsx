
import React from 'react';
import { Clock, AlertCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ShiftAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
}

interface UpcomingShift {
  id: string;
  time: string;
  client: string;
  staff: string;
}

const ShiftOverview = () => {
  // Mock data for alerts
  const alerts: ShiftAlert[] = [
    {
      id: '1',
      type: 'critical',
      message: 'Missed Clock-in: Sarah Miller at Johnson Residence',
      time: '10 min ago'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Late Arrival: David Chen at Thompson Care',
      time: '25 min ago'
    },
    {
      id: '3',
      type: 'info',
      message: 'Unassigned shift: Clark Residence, 2:00 PM',
      time: 'Today, 9:30 AM'
    }
  ];

  // Mock data for upcoming shifts
  const upcomingShifts: UpcomingShift[] = [
    {
      id: '1',
      time: '11:30 AM - 1:00 PM',
      client: 'Martha Rogers',
      staff: 'Emma Davis'
    },
    {
      id: '2',
      time: '1:00 PM - 3:30 PM',
      client: 'Thomas Johnson',
      staff: 'James Wilson'
    },
    {
      id: '3',
      time: '2:00 PM - 4:30 PM',
      client: 'Nancy Clark',
      staff: 'Unassigned'
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Shift Overview & Alerts</CardTitle>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Roster
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Critical Alerts</h4>
          <div className="space-y-1">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`alert-item alert-${alert.type}`}
              >
                <AlertCircle className={`h-5 w-5 ${
                  alert.type === 'critical' 
                    ? 'text-danger' 
                    : alert.type === 'warning' 
                      ? 'text-warning' 
                      : 'text-info'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-3">Upcoming Shifts</h4>
          <div className="space-y-3">
            {upcomingShifts.map((shift) => (
              <div key={shift.id} className="flex items-center px-4 py-2 rounded-md bg-muted/50">
                <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{shift.client}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{shift.time}</p>
                    <span className={`text-xs ${
                      shift.staff === 'Unassigned' 
                        ? 'text-danger font-medium' 
                        : 'text-muted-foreground'
                    }`}>
                      {shift.staff}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Button size="sm">
            View All Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftOverview;
