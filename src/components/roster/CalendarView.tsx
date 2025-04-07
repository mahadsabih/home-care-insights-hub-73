
import React from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Users, User, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CalendarViewProps {
  date: Date;
  onShiftClick: (shift: any) => void;
}

// Mock shifts data
const mockShifts = [
  {
    id: "shift-1",
    client: "John Smith",
    staff: "Nurse Sarah",
    date: new Date(),
    startTime: "09:00",
    endTime: "11:00",
    status: "assigned",
  },
  {
    id: "shift-2",
    client: "Mary Johnson",
    staff: "Nurse John",
    date: new Date(),
    startTime: "10:00",
    endTime: "12:30",
    status: "in-progress",
  },
  {
    id: "shift-3",
    client: "Robert Davis",
    staff: "",
    date: addDays(new Date(), 1),
    startTime: "14:00",
    endTime: "16:00",
    status: "unassigned",
  },
  {
    id: "shift-4",
    client: "Elizabeth Wilson",
    staff: "Nurse Sarah",
    date: addDays(new Date(), 1),
    startTime: "13:00",
    endTime: "15:00",
    status: "assigned",
  },
  {
    id: "shift-5",
    client: "Patricia Moore",
    staff: "Nurse Emma",
    date: addDays(new Date(), 2),
    startTime: "16:00",
    endTime: "18:00",
    status: "assigned",
  },
];

const CalendarView: React.FC<CalendarViewProps> = ({ date, onShiftClick }) => {
  // Generate days of the current week
  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  // Generate time slots from 7 AM to 10 PM
  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 7;
    return `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'pm' : 'am'}`;
  });

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
      <div className="min-w-[1000px]">
        {/* Days header */}
        <div className="flex border-b">
          <div className="w-20 flex-shrink-0 p-2 font-medium border-r">Time</div>
          {weekDays.map((day, index) => (
            <div 
              key={index}
              className={`flex-1 p-2 text-center font-medium border-r last:border-r-0 ${
                isSameDay(day, new Date()) ? 'bg-blue-50' : ''
              }`}
            >
              <div>{format(day, 'EEE')}</div>
              <div>{format(day, 'd MMM')}</div>
            </div>
          ))}
        </div>
        
        {/* Time slots and shifts */}
        {timeSlots.map((time, timeIndex) => (
          <div key={timeIndex} className="flex border-b">
            <div className="w-20 flex-shrink-0 p-2 text-center text-sm border-r">
              {time}
            </div>
            
            {weekDays.map((day, dayIndex) => {
              const shiftsForTimeAndDay = mockShifts.filter(shift => {
                const [shiftHour] = shift.startTime.split(':').map(Number);
                const timeHour = timeIndex + 7;
                return isSameDay(shift.date, day) && shiftHour === timeHour;
              });
              
              return (
                <div 
                  key={dayIndex} 
                  className={`flex-1 p-1 border-r last:border-r-0 min-h-16 relative ${
                    isSameDay(day, new Date()) ? 'bg-blue-50' : ''
                  }`}
                >
                  {shiftsForTimeAndDay.map(shift => (
                    <div
                      key={shift.id}
                      className={`mb-1 rounded-md border px-2 py-1 cursor-pointer text-xs ${getStatusColor(shift.status)}`}
                      onClick={() => onShiftClick(shift)}
                    >
                      <div className="font-semibold truncate">{shift.client}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{shift.startTime} - {shift.endTime}</span>
                        {shift.staff ? (
                          <span className="text-xs">{shift.staff}</span>
                        ) : (
                          <span className="text-xs text-red-600 font-semibold">Unassigned</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
