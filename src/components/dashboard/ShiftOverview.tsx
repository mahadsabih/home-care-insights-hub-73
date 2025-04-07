
import React, { useState } from 'react';
import { Clock, AlertCircle, Calendar, Users, PlusCircle, CheckCircle, Clock3, Pill } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

interface ShiftAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
  clientName: string;
  staffName: string;
  location?: string;
}

interface Shift {
  id: string;
  clientName: string;
  staffName: string;
  startTime: string;
  endTime?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'delayed';
  hasMedications: boolean;
}

const ShiftOverview = () => {
  // Set default active tab
  const [activeTab, setActiveTab] = useState('alerts');

  // Mock data for alerts
  const alerts: ShiftAlert[] = [
    {
      id: '1',
      type: 'critical',
      message: 'Missed Clock-in',
      time: '10 min ago',
      clientName: 'Johnson Residence',
      staffName: 'Sarah Miller',
      location: '123 Oak Street'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Late Arrival',
      time: '25 min ago',
      clientName: 'Thompson Care',
      staffName: 'David Chen',
      location: '456 Maple Avenue'
    },
    {
      id: '3',
      type: 'info',
      message: 'Unassigned shift',
      time: '2:00 PM',
      clientName: 'Clark Residence',
      staffName: 'Unassigned',
      location: '789 Pine Road'
    }
  ];

  // Mock data for ongoing & recent shifts
  const ongoingShifts: Shift[] = [
    {
      id: '1',
      clientName: 'Robert Adams',
      staffName: 'Jennifer Wilson',
      startTime: '09:05 AM',
      status: 'in-progress',
      hasMedications: true
    },
    {
      id: '2',
      clientName: 'Eleanor Smith',
      staffName: 'Michael Brown',
      startTime: '08:15 AM',
      endTime: '09:02 AM',
      status: 'completed',
      hasMedications: false
    },
    {
      id: '3',
      clientName: 'William Johnson',
      staffName: 'Emily Davis',
      startTime: '09:30 AM',
      status: 'delayed',
      hasMedications: true
    }
  ];

  // Mock data for upcoming shifts
  const upcomingShifts: Shift[] = [
    {
      id: '1',
      clientName: 'Martha Rogers',
      staffName: 'Emma Davis',
      startTime: '11:30 AM',
      endTime: '1:00 PM',
      status: 'scheduled',
      hasMedications: true
    },
    {
      id: '2',
      clientName: 'Thomas Johnson',
      staffName: 'James Wilson',
      startTime: '1:00 PM',
      endTime: '3:30 PM',
      status: 'scheduled',
      hasMedications: false
    },
    {
      id: '3',
      clientName: 'Nancy Clark',
      staffName: 'Unassigned',
      startTime: '2:00 PM',
      endTime: '4:30 PM',
      status: 'scheduled',
      hasMedications: true
    }
  ];

  // Get status icon based on shift status
  const getStatusIcon = (status: Shift['status']) => {
    switch (status) {
      case 'in-progress':
        return <Clock3 className="h-4 w-4 text-info" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'delayed':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Get alert type icon
  const getAlertIcon = (type: ShiftAlert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-danger" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-info" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Get status text
  const getStatusText = (status: Shift['status']) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'delayed':
        return 'Delayed';
      default:
        return 'Scheduled';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Shift Overview & Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="alerts" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-3 w-full rounded-none border-b bg-transparent">
            <TabsTrigger 
              value="alerts" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-11"
            >
              Alerts
            </TabsTrigger>
            <TabsTrigger 
              value="ongoing" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-11"
            >
              Ongoing & Recent
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-11"
            >
              Upcoming
            </TabsTrigger>
          </TabsList>
          
          {/* Alerts Tab Content */}
          <TabsContent value="alerts" className="p-4 pt-3">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`alert-item alert-${alert.type} flex items-start`}>
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{alert.message}</p>
                      <p className="text-xs text-muted-foreground ml-2">{alert.time}</p>
                    </div>
                    <p className="text-sm mt-1"><span className="font-medium">{alert.staffName}</span> at {alert.clientName}</p>
                    {alert.location && (
                      <p className="text-xs text-muted-foreground mt-1">{alert.location}</p>
                    )}
                  </div>
                </div>
              ))}
              <Button size="sm" variant="link" className="mt-2 p-0">
                View All Alerts
              </Button>
            </div>
          </TabsContent>
          
          {/* Ongoing & Recent Tab Content */}
          <TabsContent value="ongoing" className="p-4 pt-3">
            <div className="space-y-3">
              {ongoingShifts.map((shift) => (
                <div key={shift.id} className="flex items-center px-4 py-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                  {getStatusIcon(shift.status)}
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{shift.clientName}</p>
                      {shift.hasMedications && <Pill className="h-4 w-4 text-info ml-1" />}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{shift.staffName}</p>
                      <span className="text-xs">
                        {shift.status === 'completed' 
                          ? `${shift.startTime} - ${shift.endTime}` 
                          : `${shift.startTime} - ${getStatusText(shift.status)}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Upcoming Tab Content */}
          <TabsContent value="upcoming" className="p-4 pt-3">
            <div className="space-y-3">
              {upcomingShifts.map((shift) => (
                <div key={shift.id} className="flex items-center px-4 py-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{shift.clientName}</p>
                      {shift.hasMedications && <Pill className="h-4 w-4 text-info ml-1" />}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${shift.staffName === 'Unassigned' ? 'text-danger font-medium' : 'text-muted-foreground'}`}>
                        {shift.staffName}
                      </p>
                      <span className="text-xs">{shift.startTime} - {shift.endTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <div className="p-4 pt-0 flex justify-center border-t mt-2">
            <Button size="sm" asChild>
              <Link to="/roster">
                <Calendar className="mr-2 h-4 w-4" />
                View Roster
              </Link>
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShiftOverview;
