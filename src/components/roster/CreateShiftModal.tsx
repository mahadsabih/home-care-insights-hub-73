
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, User, Users, MapPin, FileText } from "lucide-react";

interface CreateShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateShiftModal: React.FC<CreateShiftModalProps> = ({ isOpen, onClose }) => {
  const [shiftDate, setShiftDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [shiftNotes, setShiftNotes] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPattern, setRecurringPattern] = useState("daily");
  const [recurringEndDate, setRecurringEndDate] = useState<Date | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the form data here
    console.log({
      shiftDate,
      startTime,
      endTime,
      selectedClient,
      selectedStaff,
      shiftNotes,
      isRecurring,
      recurringPattern,
      recurringEndDate
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Shift</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new shift.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient} required>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-smith">John Smith</SelectItem>
                  <SelectItem value="mary-johnson">Mary Johnson</SelectItem>
                  <SelectItem value="robert-davis">Robert Davis</SelectItem>
                  <SelectItem value="elizabeth-wilson">Elizabeth Wilson</SelectItem>
                  <SelectItem value="patricia-moore">Patricia Moore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="staff">Staff Member (Optional)</Label>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger id="staff">
                  <SelectValue placeholder="Select a staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nurse-sarah">Nurse Sarah</SelectItem>
                  <SelectItem value="nurse-john">Nurse John</SelectItem>
                  <SelectItem value="nurse-emma">Nurse Emma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {shiftDate ? format(shiftDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={shiftDate}
                    onSelect={(date) => date && setShiftDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="recurring"
                  checked={isRecurring}
                  onCheckedChange={(checked) => 
                    setIsRecurring(checked === true)
                  }
                />
                <Label htmlFor="recurring">Recurring Shift</Label>
              </div>
              
              {isRecurring && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="recurring-pattern">Repeats</Label>
                    <Select 
                      value={recurringPattern} 
                      onValueChange={setRecurringPattern}
                    >
                      <SelectTrigger id="recurring-pattern">
                        <SelectValue placeholder="Select pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="weekdays">Weekdays (Mon-Fri)</SelectItem>
                        <SelectItem value="custom">Custom Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {recurringEndDate 
                            ? format(recurringEndDate, "PPP") 
                            : "No end date"
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={recurringEndDate}
                          onSelect={setRecurringEndDate}
                          initialFocus
                          disabled={(date) => 
                            date < shiftDate
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="shift-notes">Shift Notes</Label>
              <Textarea
                id="shift-notes"
                placeholder="Add any important notes about this shift..."
                value={shiftNotes}
                onChange={(e) => setShiftNotes(e.target.value)}
                className="h-24"
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Shift</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateShiftModal;
