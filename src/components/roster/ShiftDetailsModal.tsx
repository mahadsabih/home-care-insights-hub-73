
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { 
  Clock, 
  User, 
  MapPin, 
  FileText, 
  Calendar, 
  Edit, 
  UserCheck, 
  CheckCircle, 
  X,
  AlertCircle
} from "lucide-react";

interface ShiftDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: any;
}

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

const ShiftDetailsModal: React.FC<ShiftDetailsModalProps> = ({ isOpen, onClose, shift }) => {
  const [notes, setNotes] = useState(shift.notes || "");
  const [activeTab, setActiveTab] = useState("details");
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Shift Details</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Client Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Client Name</Label>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{shift.client}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Address</Label>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{shift.address || "123 Main St, Anytown"}</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Required Skills</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(shift.skills || ["Medication", "Personal Care"]).map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-purple-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Shift Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Status</Label>
                    <div className="mt-1">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(shift.status)} px-3 py-1`}
                      >
                        {shift.status === "assigned" && <Clock className="h-3 w-3 mr-1" />}
                        {shift.status === "unassigned" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {shift.status === "in-progress" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {shift.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Assigned To</Label>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {shift.staff ? (
                        <span>{shift.staff}</span>
                      ) : (
                        <span className="text-red-600">Unassigned</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Date</Label>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{format(shift.date || new Date(), "PPP")}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-muted-foreground">Time</Label>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{shift.startTime} - {shift.endTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Clock In</Label>
                      <div className="mt-1">
                        {shift.clockIn ? (
                          <span>{shift.clockIn}</span>
                        ) : (
                          <span className="text-muted-foreground">Not clocked in yet</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-muted-foreground">Clock Out</Label>
                      <div className="mt-1">
                        {shift.clockOut ? (
                          <span>{shift.clockOut}</span>
                        ) : (
                          <span className="text-muted-foreground">Not clocked out yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes">
            <div className="py-4">
              <Label htmlFor="shift-notes" className="text-md font-medium mb-2 block">
                Shift Notes
              </Label>
              <Textarea
                id="shift-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this shift..."
                className="h-[200px]"
              />
              <div className="mt-4 flex justify-end">
                <Button>Save Notes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-4">Shift History</h3>
              <div className="space-y-4 bg-muted/50 p-4 rounded-md">
                <div className="flex items-center">
                  <div className="w-24 text-sm text-muted-foreground">Today, 9:05 AM</div>
                  <div className="flex-1">Shift created by Admin</div>
                </div>
                {shift.staff && (
                  <div className="flex items-center">
                    <div className="w-24 text-sm text-muted-foreground">Today, 9:10 AM</div>
                    <div className="flex-1">Assigned to {shift.staff}</div>
                  </div>
                )}
                {shift.status === "in-progress" && (
                  <div className="flex items-center">
                    <div className="w-24 text-sm text-muted-foreground">Today, {shift.clockIn}</div>
                    <div className="flex-1">Staff clocked in</div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2">
          <div className="flex flex-1 flex-wrap gap-2">
            {shift.status === "unassigned" && (
              <Button variant="outline" size="sm" className="flex items-center">
                <UserCheck className="h-4 w-4 mr-1" />
                Assign Staff
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex items-center">
              <Edit className="h-4 w-4 mr-1" />
              Edit Shift
            </Button>
            {shift.status !== "completed" && (
              <Button variant="outline" size="sm" className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50">
              <X className="h-4 w-4 mr-1" />
              Cancel Shift
            </Button>
          </div>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftDetailsModal;
