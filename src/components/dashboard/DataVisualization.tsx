
import React from 'react';
import { CalendarDays, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const DataVisualization = () => {
  // Mock data for shift status chart
  const shiftStatusData = [
    { name: 'Scheduled', value: 28, fill: '#2563EB' },
    { name: 'In Progress', value: 12, fill: '#F59E0B' },
    { name: 'Completed', value: 35, fill: '#10B981' },
    { name: 'Missed', value: 5, fill: '#EF4444' }
  ];

  // Mock data for upcoming care hours chart
  const upcomingCareHours = [
    { day: 'Today', hours: 98, target: 100 },
    { day: 'Thu', hours: 85, target: 100 },
    { day: 'Fri', hours: 90, target: 100 },
    { day: 'Sat', hours: 75, target: 100 },
    { day: 'Sun', hours: 65, target: 100 },
    { day: 'Mon', hours: 95, target: 100 },
    { day: 'Tue', hours: 100, target: 100 }
  ];

  // Custom tooltip for shift status chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm rounded-md">
          <p className="text-sm font-medium">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-primary" />
            Today's Shift Status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={shiftStatusData}
                layout="vertical"
                barCategoryGap={12}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
            Upcoming Care Hours (7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={upcomingCareHours}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="3 3" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
