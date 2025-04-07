
import React from 'react';
import { MapPin, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface StaffLocation {
  id: string;
  name: string;
  status: 'on-shift' | 'travelling' | 'alert';
  client: string;
  latitude: number;
  longitude: number;
  isSelected?: boolean;
}

const LiveCoverageMap = () => {
  // Mock data for staff locations in Birmingham, UK
  const staffLocations: StaffLocation[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      status: 'on-shift',
      client: 'Williams Residence',
      latitude: 52.483,
      longitude: -1.894,
    },
    {
      id: '2',
      name: 'Michael Brown',
      status: 'on-shift',
      client: 'Thompson Care Home',
      latitude: 52.475,
      longitude: -1.889,
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      status: 'on-shift',
      client: 'Clark Residence',
      latitude: 52.49,
      longitude: -1.9,
      isSelected: true,
    },
    {
      id: '4',
      name: 'David Chen',
      status: 'on-shift',
      client: 'Harris Assisted Living',
      latitude: 52.467,
      longitude: -1.903,
    },
    {
      id: '5',
      name: 'Jessica Davis',
      status: 'travelling',
      client: 'Roberts Residence',
      latitude: 52.485,
      longitude: -1.915,
    },
    {
      id: '6',
      name: 'Thomas Martin',
      status: 'alert',
      client: 'Edwards Care Facility',
      latitude: 52.458,
      longitude: -1.878,
    },
  ];

  // Get status color based on staff status
  const getStatusColor = (status: StaffLocation['status']) => {
    switch (status) {
      case 'on-shift':
        return 'text-success bg-success/10';
      case 'travelling':
        return 'text-warning bg-warning/10';
      case 'alert':
        return 'text-danger bg-danger/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  // Get status label
  const getStatusLabel = (status: StaffLocation['status']) => {
    switch (status) {
      case 'on-shift':
        return 'On Shift';
      case 'travelling':
        return 'Travelling';
      case 'alert':
        return 'Alert';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Live Coverage Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-[240px] overflow-hidden rounded-b-lg">
          {/* Static map image for Birmingham */}
          <div className="absolute inset-0 bg-[#e5e3df] flex items-center justify-center">
            {/* Simplified map representation */}
            <div className="w-full h-full relative">
              {/* Map grid lines and background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23e5e3df\"/><path d=\"M0,0 L100,0 L100,100 L0,100 Z\" fill=\"none\" stroke=\"%23d1d1d1\" stroke-width=\"0.5\"/><path d=\"M50,0 L50,100 M0,50 L100,50\" fill=\"none\" stroke=\"%23d1d1d1\" stroke-width=\"0.5\"/></svg>')] bg-repeat"></div>
              
              {/* Main roads */}
              <div className="absolute left-1/2 top-1/2 w-[120%] h-[2px] bg-[#c0c0c0] transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <div className="absolute left-1/2 top-1/2 w-[120%] h-[2px] bg-[#c0c0c0] transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
              <div className="absolute left-1/2 top-1/2 w-[120%] h-[2px] bg-[#c0c0c0] transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-1/2 w-[2px] h-[120%] bg-[#c0c0c0] transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Birmingham label */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground px-1 py-0.5 bg-background/80 rounded">
                Birmingham
              </div>
              
              {/* Staff location markers */}
              {staffLocations.map((staff) => (
                <div
                  key={staff.id}
                  className={`absolute w-3 h-3 rounded-full ${getStatusColor(staff.status)} transform -translate-x-1/2 -translate-y-1/2 border border-white`}
                  style={{
                    left: `${(((staff.longitude + 1.9) / 0.05) * 50) % 100}%`,
                    top: `${(((52.5 - staff.latitude) / 0.05) * 50) % 100}%`,
                    zIndex: staff.isSelected ? 10 : 5,
                  }}
                ></div>
              ))}
              
              {/* Selected staff tooltip */}
              {staffLocations.filter(staff => staff.isSelected).map(staff => (
                <div 
                  key={`tooltip-${staff.id}`}
                  className="absolute bg-white shadow-md rounded-md p-2 text-xs w-40 z-20"
                  style={{
                    left: `${(((staff.longitude + 1.9) / 0.05) * 50) % 100}%`,
                    top: `${(((52.5 - staff.latitude) / 0.05) * 50) % 100 - 15}%`,
                  }}
                >
                  <p className="font-semibold">{staff.name}</p>
                  <p className="text-muted-foreground">Client: {staff.client}</p>
                  <p className={`${getStatusColor(staff.status)} inline-block px-1.5 py-0.5 rounded-sm mt-1 text-[10px]`}>
                    {getStatusLabel(staff.status)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Map controls */}
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-background shadow-sm">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-background shadow-sm">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Map filters */}
          <div className="absolute left-3 bottom-3 flex flex-col gap-1.5 bg-background/90 p-2 rounded-md shadow-sm">
            <div className="flex items-center space-x-2">
              <Checkbox id="show-staff" defaultChecked />
              <Label htmlFor="show-staff" className="text-xs cursor-pointer">
                Show Staff On Duty
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="show-clients" />
              <Label htmlFor="show-clients" className="text-xs cursor-pointer">
                Show Client Locations
              </Label>
            </div>
          </div>
          
          {/* Simple legend */}
          <div className="absolute right-3 bottom-3 bg-background/90 p-2 rounded-md shadow-sm">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-success/10 text-success border border-white"></div>
                <span className="text-[10px]">On Shift</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-warning/10 text-warning border border-white"></div>
                <span className="text-[10px]">Travelling</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-danger/10 text-danger border border-white"></div>
                <span className="text-[10px]">Alert</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveCoverageMap;
