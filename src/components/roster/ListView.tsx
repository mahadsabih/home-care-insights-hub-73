
import React, { useState } from "react";
import { format, isSameDay } from "date-fns";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  User, 
  Users, 
  MapPin,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ListViewProps {
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
    address: "123 Main St, Anytown",
    skills: ["Medication", "Personal Care"],
    clockIn: "",
    clockOut: "",
    notes: "Client prefers morning visits"
  },
  {
    id: "shift-2",
    client: "Mary Johnson",
    staff: "Nurse John",
    date: new Date(),
    startTime: "10:00",
    endTime: "12:30",
    status: "in-progress",
    address: "456 Oak St, Anytown",
    skills: ["Blood Pressure", "Wound Care"],
    clockIn: "10:05",
    clockOut: "",
    notes: ""
  },
  {
    id: "shift-3",
    client: "Robert Davis",
    staff: "",
    date: new Date(),
    startTime: "14:00",
    endTime: "16:00",
    status: "unassigned",
    address: "789 Pine St, Anytown",
    skills: ["Physiotherapy", "Medication"],
    clockIn: "",
    clockOut: "",
    notes: "Needs specialized care"
  },
  {
    id: "shift-4",
    client: "Elizabeth Wilson",
    staff: "Nurse Sarah",
    date: new Date(),
    startTime: "13:00",
    endTime: "15:00",
    status: "assigned",
    address: "101 Cedar St, Anytown",
    skills: ["Personal Care", "Mobility Assistance"],
    clockIn: "",
    clockOut: "",
    notes: ""
  },
  {
    id: "shift-5",
    client: "Patricia Moore",
    staff: "Nurse Emma",
    date: new Date(),
    startTime: "16:00",
    endTime: "18:00",
    status: "assigned",
    address: "202 Elm St, Anytown",
    skills: ["Medication", "Blood Pressure"],
    clockIn: "",
    clockOut: "",
    notes: "Family member will be present"
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'assigned':
      return (
        <Badge variant="outline" className="bg-blue-100 border-blue-300 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          Assigned
        </Badge>
      );
    case 'unassigned':
      return (
        <Badge variant="outline" className="bg-red-100 border-red-300 text-red-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Unassigned
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge variant="outline" className="bg-green-100 border-green-300 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="outline" className="bg-gray-100 border-gray-300 text-gray-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 border-gray-300 text-gray-800">
          {status}
        </Badge>
      );
  }
};

const ListView: React.FC<ListViewProps> = ({ date, onShiftClick }) => {
  const [sortField, setSortField] = useState("startTime");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredShifts = mockShifts.filter(shift => isSameDay(shift.date, date));

  const sortedShifts = [...filteredShifts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "startTime":
        comparison = a.startTime.localeCompare(b.startTime);
        break;
      case "endTime":
        comparison = a.endTime.localeCompare(b.endTime);
        break;
      case "client":
        comparison = a.client.localeCompare(b.client);
        break;
      case "staff":
        comparison = a.staff.localeCompare(b.staff);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("startTime")}
            >
              <div className="flex items-center">
                Start Time
                {sortField === "startTime" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("endTime")}
            >
              <div className="flex items-center">
                End Time
                {sortField === "endTime" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("client")}
            >
              <div className="flex items-center">
                Client
                {sortField === "client" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("staff")}
            >
              <div className="flex items-center">
                Staff
                {sortField === "staff" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {sortField === "status" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="ml-1 h-4 w-4" /> : 
                    <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedShifts.length > 0 ? (
            sortedShifts.map((shift) => (
              <TableRow key={shift.id} className="cursor-pointer hover:bg-muted" onClick={() => onShiftClick(shift)}>
                <TableCell>{shift.startTime}</TableCell>
                <TableCell>{shift.endTime}</TableCell>
                <TableCell className="font-medium">{shift.client}</TableCell>
                <TableCell>
                  {shift.staff ? (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-muted-foreground" />
                      {shift.staff}
                    </div>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      Unassigned
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(shift.status)}</TableCell>
                <TableCell>
                  {shift.clockIn ? (
                    shift.clockIn
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {shift.clockOut ? (
                    shift.clockOut
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {shift.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{shift.address}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {shift.notes ? (
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                      Edit
                    </Button>
                    {!shift.staff && (
                      <Button size="sm" variant="outline" className="h-8 px-2 text-xs">
                        Assign
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-4 text-muted-foreground">
                No shifts scheduled for this date
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListView;
