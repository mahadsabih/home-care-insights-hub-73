
import React from "react";
import { Users, User, Clock, MapPin, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimelineViewProps {
  date: Date;
  onShiftClick: (shift: any) => void;
}

// Mock shifts data
const mockShifts = [
  {
    id: "shift-1",
    client: "John Smith",
    staff: "Nurse Sarah",
    startTime: "09:00",
    endTime: "11:00",
    status: "assigned",
  },
  {
    id: "shift-2",
    client: "Mary Johnson",
    staff: "Nurse John",
    startTime: "10:00",
    endTime: "12:30",
    status: "in-progress",
  },
  {
    id: "shift-3",
    client: "Robert Davis",
    staff: "",
    startTime: "14:00",
    endTime: "16:00",
    status: "unassigned",
  },
  {
    id: "shift-4",
    client: "Elizabeth Wilson",
    staff: "Nurse Sarah",
    startTime: "13:00",
    endTime: "15:00",
    status: "assigned",
  },
  {
    id: "shift-5",
    client: "Patricia Moore",
    staff: "Nurse Emma",
    startTime: "16:00",
    endTime: "18:00",
    status: "assigned",
  },
];

// Mock staff data
const mockStaff = [
  { id: "staff-1", name: "Nurse Sarah" },
  { id: "staff-2", name: "Nurse John" },
  { id: "staff-3", name: "Nurse Emma" },
];

const TimelineView: React.FC<TimelineViewProps> = ({ date, onShiftClick }) => {
  // Generate time slots from 7 AM to 10 PM
  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 7;
    return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'pm' : 'am'}`;
  });

  const getShiftPosition = (startTime: string) => {
    const [hours] = startTime.split(':').map(Number);
    return ((hours - 7) * 80) + 'px'; // Each hour is 80px wide
  };

  const getShiftWidth = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = (startHours * 60) + startMinutes;
    const endTotalMinutes = (endHours * 60) + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    
    return (durationMinutes / 60 * 80) + 'px'; // Each hour is 80px wide
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'unassigned':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'in-progress':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'completed':
        return 'bg-gray-100 border-gray-300 text-gray-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px]">
        {/* Time header */}
        <div className="flex border-b">
          <div className="w-48 flex-shrink-0 p-2 font-medium border-r">Staff / Time</div>
          <div className="flex-1 flex">
            {timeSlots.map((time, index) => (
              <div 
                key={index}
                className="w-20 flex-shrink-0 p-2 text-center text-sm border-r last:border-r-0"
              >
                {time}
              </div>
            ))}
          </div>
        </div>
        
        {/* Staff rows */}
        {mockStaff.map((staff) => {
          const staffShifts = mockShifts.filter(shift => shift.staff === staff.name);
          
          return (
            <div key={staff.id} className="flex border-b">
              <div className="w-48 flex-shrink-0 p-2 font-medium border-r flex items-center">
                <User className="w-4 h-4 mr-2" />
                {staff.name}
              </div>
              <div className="flex-1 relative h-16">
                {/* Time grid */}
                <div className="flex absolute top-0 bottom-0 left-0 right-0">
                  {timeSlots.map((_, index) => (
                    <div key={index} className="w-20 flex-shrink-0 border-r last:border-r-0"></div>
                  ))}
                </div>
                
                {/* Shifts */}
                {staffShifts.map(shift => (
                  <div
                    key={shift.id}
                    className={`absolute top-2 h-12 rounded-md border px-2 py-1 cursor-pointer text-xs ${getStatusColor(shift.status)}`}
                    style={{
                      left: getShiftPosition(shift.startTime),
                      width: getShiftWidth(shift.startTime, shift.endTime),
                    }}
                    onClick={() => onShiftClick(shift)}
                  >
                    <div className="font-semibold truncate">{shift.client}</div>
                    <div className="flex items-center text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {shift.startTime} - {shift.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Unassigned shifts row */}
        <div className="flex border-b">
          <div className="w-48 flex-shrink-0 p-2 font-medium border-r flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
            Unassigned Shifts
          </div>
          <div className="flex-1 relative h-16">
            {/* Time grid */}
            <div className="flex absolute top-0 bottom-0 left-0 right-0">
              {timeSlots.map((_, index) => (
                <div key={index} className="w-20 flex-shrink-0 border-r last:border-r-0"></div>
              ))}
            </div>
            
            {/* Unassigned Shifts */}
            {mockShifts
              .filter(shift => shift.status === "unassigned")
              .map(shift => (
                <div
                  key={shift.id}
                  className="absolute top-2 h-12 rounded-md border px-2 py-1 cursor-pointer text-xs bg-red-100 border-red-300 text-red-800"
                  style={{
                    left: getShiftPosition(shift.startTime),
                    width: getShiftWidth(shift.startTime, shift.endTime),
                  }}
                  onClick={() => onShiftClick(shift)}
                >
                  <div className="font-semibold truncate">{shift.client}</div>
                  <div className="flex items-center text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {shift.startTime} - {shift.endTime}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
