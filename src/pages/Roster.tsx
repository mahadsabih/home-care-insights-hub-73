
import React, { useState } from "react";
import { Calendar as CalendarIcon, List, Clock, Filter, Plus, X } from "lucide-react";
import { format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import TimelineView from "@/components/roster/TimelineView";
import CalendarView from "@/components/roster/CalendarView";
import ListView from "@/components/roster/ListView";
import FiltersPanel from "@/components/roster/FiltersPanel";
import CreateShiftModal from "@/components/roster/CreateShiftModal";
import ShiftDetailsModal from "@/components/roster/ShiftDetailsModal";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockShift = {
  id: "shift-1",
  client: "John Smith",
  staff: "Nurse Sarah",
  date: new Date(),
  startTime: "09:00",
  endTime: "11:00",
  status: "assigned",
  address: "123 Main St",
  skills: ["Medication", "Personal Care"],
  notes: "Client prefers morning visits",
};

const Roster = () => {
  const [activeView, setActiveView] = useState("timeline");
  const [showFilters, setShowFilters] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShiftDetails, setShowShiftDetails] = useState(false);
  const [selectedShift, setSelectedShift] = useState(mockShift);
  
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const handleShiftClick = (shift: any) => {
    setSelectedShift(shift);
    setShowShiftDetails(true);
  };

  const handleCloseShiftDetails = () => {
    setShowShiftDetails(false);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="flex-1 space-y-4 p-6 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Roster</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border rounded-md p-1">
              <Button
                variant={activeView === "timeline" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("timeline")}
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Timeline</span>
              </Button>
              
              <Button
                variant={activeView === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("calendar")}
                className="flex items-center gap-1"
              >
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
              
              <Button
                variant={activeView === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("list")}
                className="flex items-center gap-1"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className="flex items-center gap-1"
            >
              {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
              <span className="hidden sm:inline">{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </Button>
            
            <Button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Shift</span>
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4">
          {showFilters && (
            <div className="w-64 shrink-0">
              <FiltersPanel />
            </div>
          )}
          
          <div className="flex-1">
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex gap-2 items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const prevDay = new Date(date);
                        prevDay.setDate(date.getDate() - 1);
                        setDate(prevDay);
                      }}
                    >
                      Previous
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const nextDay = new Date(date);
                        nextDay.setDate(date.getDate() + 1);
                        setDate(nextDay);
                      }}
                    >
                      Next
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDate(new Date())}
                    >
                      Today
                    </Button>
                    
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
                        onClick={() => document.getElementById('date-picker')?.click()}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(date, 'PPP')}
                      </Button>
                      <div className="absolute top-10 z-10">
                        <input
                          type="date"
                          id="date-picker"
                          className="sr-only"
                          onChange={(e) => {
                            if (e.target.value) {
                              setDate(new Date(e.target.value));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by staff" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Staff</SelectItem>
                        <SelectItem value="nurse-sarah">Nurse Sarah</SelectItem>
                        <SelectItem value="nurse-john">Nurse John</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="p-4">
                  {activeView === "timeline" && <TimelineView date={date} onShiftClick={handleShiftClick} />}
                  {activeView === "calendar" && <CalendarView date={date} onShiftClick={handleShiftClick} />}
                  {activeView === "list" && <ListView date={date} onShiftClick={handleShiftClick} />}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {showCreateModal && (
        <CreateShiftModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      )}
      
      {showShiftDetails && (
        <ShiftDetailsModal 
          isOpen={showShiftDetails} 
          onClose={handleCloseShiftDetails} 
          shift={selectedShift} 
        />
      )}
    </div>
  );
};

export default Roster;
