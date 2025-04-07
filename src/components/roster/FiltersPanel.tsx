
import React from "react";
import { Search, Filter, User, Users, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FiltersPanel = () => {
  return (
    <div className="bg-white p-4 rounded-md border h-full">
      <div className="font-semibold text-lg mb-4 flex items-center">
        <Filter className="w-5 h-5 mr-2" />
        Filters
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="search" className="mb-2 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Client name, staff name..."
              className="pl-8"
            />
          </div>
        </div>
        
        <Accordion type="multiple" defaultValue={["staff", "clients", "status"]}>
          <AccordionItem value="staff">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Staff
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="staff-all" />
                  <Label htmlFor="staff-all">All Staff</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="staff-sarah" />
                  <Label htmlFor="staff-sarah">Nurse Sarah</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="staff-john" />
                  <Label htmlFor="staff-john">Nurse John</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="staff-emma" />
                  <Label htmlFor="staff-emma">Nurse Emma</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="staff-unassigned" />
                  <Label htmlFor="staff-unassigned">Unassigned Shifts</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="clients">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Clients
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="client-all" />
                  <Label htmlFor="client-all">All Clients</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="client-john" />
                  <Label htmlFor="client-john">John Smith</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="client-mary" />
                  <Label htmlFor="client-mary">Mary Johnson</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="client-robert" />
                  <Label htmlFor="client-robert">Robert Davis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="client-elizabeth" />
                  <Label htmlFor="client-elizabeth">Elizabeth Wilson</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="client-patricia" />
                  <Label htmlFor="client-patricia">Patricia Moore</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="status">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Status
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-all" />
                  <Label htmlFor="status-all">All Statuses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-assigned" />
                  <Label htmlFor="status-assigned">Assigned</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-unassigned" />
                  <Label htmlFor="status-unassigned">Unassigned</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-in-progress" />
                  <Label htmlFor="status-in-progress">In Progress</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-completed" />
                  <Label htmlFor="status-completed">Completed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-late" />
                  <Label htmlFor="status-late">Late Clock-in</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-missed" />
                  <Label htmlFor="status-missed">Missed Clock-in</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="skills">
            <AccordionTrigger className="py-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Required Skills
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-medication" />
                  <Label htmlFor="skill-medication">Medication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-personal-care" />
                  <Label htmlFor="skill-personal-care">Personal Care</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-blood-pressure" />
                  <Label htmlFor="skill-blood-pressure">Blood Pressure</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-wound-care" />
                  <Label htmlFor="skill-wound-care">Wound Care</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-physiotherapy" />
                  <Label htmlFor="skill-physiotherapy">Physiotherapy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skill-mobility" />
                  <Label htmlFor="skill-mobility">Mobility Assistance</Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="mt-6 flex gap-2">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">Reset</Button>
      </div>
    </div>
  );
};

export default FiltersPanel;
