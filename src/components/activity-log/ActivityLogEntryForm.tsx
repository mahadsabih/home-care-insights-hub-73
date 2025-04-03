
import React, { useState } from 'react';
import { 
  Button,
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  Input,
  Textarea,
  Label,
} from '@/components/ui';
import { CalendarIcon, Paperclip } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Define log type options
const logTypeOptions = [
  { value: 'complaint', label: 'Complaint' },
  { value: 'praise', label: 'Praise' },
  { value: 'concern', label: 'Issue/Concern' },
  { value: 'missed-visit', label: 'Missed/Late Visit' },
  { value: 'medication-error', label: 'Medication Error/Near Miss' },
  { value: 'accident', label: 'Accident' },
  { value: 'safeguarding', label: 'Safeguarding Alert' },
  { value: 'client-communication', label: 'Client Communication' },
  { value: 'family-communication', label: 'Family Communication' },
  { value: 'staff-note', label: 'Staff Note' },
  { value: 'general', label: 'General Entry' },
];

// Define priority options
const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

// Define status options
const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

// Sample client options
const clientOptions = [
  { value: '1', label: 'Sarah Johnson' },
  { value: '2', label: 'Robert Williams' },
  { value: '3', label: 'Thomas Moore' },
  { value: '4', label: 'Elizabeth Taylor' },
  { value: '5', label: 'David Miller' },
];

// Sample staff options
const staffOptions = [
  { value: '1', label: 'Michael Brown' },
  { value: '2', label: 'Emma Davis' },
  { value: '3', label: 'James Wilson' },
  { value: '4', label: 'Jennifer Smith' },
  { value: '5', label: 'William Johnson' },
];

interface ActivityLogEntryFormProps {
  entry?: any;
  isViewMode?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const ActivityLogEntryForm = ({ 
  entry, 
  isViewMode = false,
  onSubmit, 
  onCancel 
}: ActivityLogEntryFormProps) => {
  
  // Create form state from entry or default values
  const [formData, setFormData] = useState({
    type: entry?.type || '',
    date: entry?.date || new Date(),
    client: entry?.client || '',
    staffInvolved: entry?.staffInvolved || '',
    source: entry?.reportedBy || '',
    subject: entry?.subject || '',
    description: entry?.description || '',
    priority: entry?.priority || 'medium',
    status: entry?.status || 'open',
    owner: entry?.owner || '',
    actionTaken: entry?.actionTaken || '',
    followUpDate: entry?.followUpDate,
    attachments: [],
  });

  const handleChange = (field: string, value: any) => {
    if (isViewMode) return;
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would typically save data here
    console.log('Form submitted:', formData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Log Type */}
        <div className="space-y-2">
          <Label>Log Type *</Label>
          <Select 
            disabled={isViewMode}
            value={formData.type} 
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select log type" />
            </SelectTrigger>
            <SelectContent>
              {logTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date & Time */}
        <div className="space-y-2">
          <Label>Date & Time *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.date && "text-muted-foreground"
                )}
                disabled={isViewMode}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPp") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => handleChange('date', date)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
              <div className="p-3 border-t">
                <Input 
                  type="time"
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const newDate = new Date(formData.date);
                    newDate.setHours(parseInt(hours), parseInt(minutes));
                    handleChange('date', newDate);
                  }}
                  disabled={isViewMode}
                  defaultValue={format(formData.date, 'HH:mm')}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Client (Service User) */}
        <div className="space-y-2">
          <Label>Client (Service User) *</Label>
          <Select 
            disabled={isViewMode}
            value={formData.client} 
            onValueChange={(value) => handleChange('client', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clientOptions.map(option => (
                <SelectItem key={option.value} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Staff Involved */}
        <div className="space-y-2">
          <Label>Staff Involved</Label>
          <Select 
            disabled={isViewMode}
            value={formData.staffInvolved} 
            onValueChange={(value) => handleChange('staffInvolved', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select staff member" />
            </SelectTrigger>
            <SelectContent>
              {staffOptions.map(option => (
                <SelectItem key={option.value} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Source / Reported By */}
        <div className="space-y-2">
          <Label>Source / Reported By *</Label>
          <Input
            disabled={isViewMode}
            placeholder="e.g., Family via phone, Staff observation"
            value={formData.source}
            onChange={(e) => handleChange('source', e.target.value)}
          />
        </div>

        {/* Subject / Title */}
        <div className="space-y-2">
          <Label>Subject / Title</Label>
          <Input
            disabled={isViewMode}
            placeholder="Brief subject of the log entry"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
          />
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select 
            disabled={isViewMode}
            value={formData.priority} 
            onValueChange={(value) => handleChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority level" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select 
            disabled={isViewMode}
            value={formData.status} 
            onValueChange={(value) => handleChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Owner / Assigned To */}
        <div className="space-y-2">
          <Label>Owner / Assigned To</Label>
          <Select 
            disabled={isViewMode}
            value={formData.owner} 
            onValueChange={(value) => handleChange('owner', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an owner" />
            </SelectTrigger>
            <SelectContent>
              {staffOptions.map(option => (
                <SelectItem key={option.value} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Follow-up Due Date */}
        <div className="space-y-2">
          <Label>Follow-up Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.followUpDate && "text-muted-foreground"
                )}
                disabled={isViewMode}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.followUpDate ? format(formData.followUpDate, "PPp") : <span>Set follow-up date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={formData.followUpDate}
                onSelect={(date) => handleChange('followUpDate', date)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="space-y-2">
        <Label>Detailed Description *</Label>
        <Textarea
          disabled={isViewMode}
          placeholder="Provide detailed information about this log entry"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
        />
      </div>

      {/* Action Taken / Follow-up Notes */}
      <div className="space-y-2">
        <Label>Action Taken / Follow-up Notes</Label>
        <Textarea
          disabled={isViewMode}
          placeholder="Describe any actions taken or follow-up required"
          value={formData.actionTaken}
          onChange={(e) => handleChange('actionTaken', e.target.value)}
          rows={3}
        />
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <Label>Attachments</Label>
        <div className="flex items-center">
          <Button type="button" variant="outline" disabled={isViewMode} className="flex items-center">
            <Paperclip className="mr-2 h-4 w-4" />
            Attach File
          </Button>
          <span className="ml-4 text-sm text-muted-foreground">
            {formData.attachments.length > 0 
              ? `${formData.attachments.length} files attached` 
              : 'No files attached'}
          </span>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          {isViewMode ? 'Close' : 'Cancel'}
        </Button>
        {!isViewMode && (
          <Button type="submit">
            {entry ? 'Save Changes' : 'Add Entry'}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ActivityLogEntryForm;
