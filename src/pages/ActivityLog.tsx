
import React, { useState } from 'react';
import { 
  Filter, Search, Plus, FileSpreadsheet, 
  ChevronDown, Check, Calendar, User, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ActivityLogEntryForm from '@/components/activity-log/ActivityLogEntryForm';
import LogTypeTag from '@/components/activity-log/LogTypeTag';
import PriorityBadge from '@/components/activity-log/PriorityBadge';
import StatusBadge from '@/components/activity-log/StatusBadge';
import { format } from 'date-fns';

// Sample data for demonstration
const sampleLogEntries = [
  {
    id: '1',
    date: new Date('2025-04-03T09:30:00'),
    type: 'complaint',
    client: 'Sarah Johnson',
    subject: 'Missed medication administration',
    staffInvolved: 'Michael Brown',
    priority: 'high',
    status: 'open',
    owner: 'Jennifer Smith',
    description: 'Client reports morning medication was not administered during the 8am visit.',
    reportedBy: 'Family member via phone',
    actionTaken: 'Contacted staff member for explanation, awaiting response.',
  },
  {
    id: '2',
    date: new Date('2025-04-02T14:15:00'),
    type: 'praise',
    client: 'Robert Williams',
    subject: 'Excellent care during recovery',
    staffInvolved: 'Emma Davis',
    priority: 'low',
    status: 'closed',
    owner: 'William Johnson',
    description: 'Family expressed deep gratitude for the exceptional care provided during client\'s recovery from surgery.',
    reportedBy: 'Daughter via email',
    actionTaken: 'Shared feedback with staff member and noted in their performance record.',
  },
  {
    id: '3',
    date: new Date('2025-04-03T11:45:00'),
    type: 'medication-error',
    client: 'Thomas Moore',
    subject: 'Incorrect dosage administered',
    staffInvolved: 'James Wilson',
    priority: 'critical',
    status: 'in-progress',
    owner: 'Jennifer Smith',
    description: 'Staff administered 20mg instead of 10mg of medication. No adverse effects observed, doctor notified.',
    reportedBy: 'Staff self-report',
    actionTaken: 'Called doctor, monitoring client, scheduled retraining for staff.',
  },
  {
    id: '4',
    date: new Date('2025-04-01T16:30:00'),
    type: 'missed-visit',
    client: 'Elizabeth Taylor',
    subject: 'Evening visit not completed',
    staffInvolved: 'Michael Brown',
    priority: 'medium',
    status: 'resolved',
    owner: 'William Johnson',
    description: 'Staff did not arrive for scheduled 4pm visit due to car trouble.',
    reportedBy: 'Client via emergency line',
    actionTaken: 'Sent replacement caregiver who arrived at 5:30pm. Followed up with client to ensure needs were met.',
  },
  {
    id: '5',
    date: new Date('2025-03-30T10:00:00'),
    type: 'safeguarding',
    client: 'David Miller',
    subject: 'Potential financial abuse concern',
    staffInvolved: '',
    priority: 'high',
    status: 'open',
    owner: 'Jennifer Smith',
    description: 'Caregiver noticed unusual bank statements and withdrawals that client seemed unaware of.',
    reportedBy: 'Staff observation',
    actionTaken: 'Initiated safeguarding protocol, contacted social services for guidance.',
  },
];

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

// Define date range options
const dateRangeOptions = [
  { value: 'today', label: 'Today' },
  { value: 'last7', label: 'Last 7 Days' },
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'custom', label: 'Custom Range' },
];

// Define priority options
const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

// Define status options
const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const ActivityLog = () => {
  // State for filters
  const [dateRange, setDateRange] = useState('last7');
  const [selectedLogTypes, setSelectedLogTypes] = useState<string[]>([]);
  const [clientFilter, setClientFilter] = useState('');
  const [staffFilter, setStaffFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for custom date range
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  
  // State for entry form modal
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [isViewingEntry, setIsViewingEntry] = useState(false);

  // Handle log type selection
  const toggleLogType = (value: string) => {
    if (selectedLogTypes.includes(value)) {
      setSelectedLogTypes(selectedLogTypes.filter(type => type !== value));
    } else {
      setSelectedLogTypes([...selectedLogTypes, value]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setDateRange('last7');
    setSelectedLogTypes([]);
    setClientFilter('');
    setStaffFilter('');
    setPriorityFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
    setFromDate(undefined);
    setToDate(undefined);
    setIsCustomDateRange(false);
  };

  // Handle date range change
  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    setIsCustomDateRange(value === 'custom');
  };

  // Handle opening the entry form for creating a new entry
  const openNewEntryForm = () => {
    setSelectedEntry(null);
    setIsViewingEntry(false);
    setIsEntryFormOpen(true);
  };

  // Handle viewing an existing entry
  const viewEntry = (entry: any) => {
    setSelectedEntry(entry);
    setIsViewingEntry(true);
    setIsEntryFormOpen(true);
  };

  // Handle editing an existing entry
  const editEntry = (entry: any) => {
    setSelectedEntry(entry);
    setIsViewingEntry(false);
    setIsEntryFormOpen(true);
  };

  // Handle exporting data
  const handleExport = () => {
    alert('Exporting data to Excel...');
    // Implementation would connect to actual export functionality
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Activity Log</h1>
        <div className="flex space-x-2">
          <Button onClick={openNewEntryForm} className="flex items-center">
            <Plus className="mr-1 h-4 w-4" /> Add New Log Entry
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex items-center">
            <FileSpreadsheet className="mr-1 h-4 w-4" /> Export to Excel
          </Button>
        </div>
      </div>

      {/* Filtering and Search Controls */}
      <div className="bg-card shadow-sm rounded-lg p-4 mb-6 border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          {/* Date Range Selector */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex space-x-2">
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {isCustomDateRange && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background pointer-events-auto" align="start">
                    <div className="p-4 flex flex-col gap-2">
                      <div>
                        <Label className="mb-2 block">From Date</Label>
                        <h3>Calendar</h3>
                        {/* <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          className="p-3 pointer-events-auto border rounded-md"
                          initialFocus
                        /> */}
                      </div>
                      <div>
                        <Label className="mb-2 block">To Date</Label>
                        <h3>Calendar</h3>
                        {/* <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          className="p-3 pointer-events-auto border rounded-md"
                          initialFocus
                        /> */}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>

          {/* Client Filter */}
          <div className="space-y-2">
            <Label>Client</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Filter by client" 
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Staff Filter */}
          <div className="space-y-2">
            <Label>Staff Involved</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Filter by staff" 
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="space-y-2">
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search logs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Priority Filter */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
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

          {/* Status Filter */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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

          {/* Log Type Filter */}
          <div className="space-y-2 xl:col-span-2">
            <Label>Log Types</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedLogTypes.length === 0 
                    ? "All Log Types" 
                    : `${selectedLogTypes.length} selected`}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <div className="p-4 grid grid-cols-2 gap-2">
                  {logTypeOptions.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type.value}`}
                        checked={selectedLogTypes.includes(type.value)}
                        onCheckedChange={() => toggleLogType(type.value)}
                      />
                      <label 
                        htmlFor={`type-${type.value}`}
                        className="text-sm cursor-pointer"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Filter Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button>
            Apply Filters <Filter className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Log Display Table */}
      <div className="bg-card shadow-sm rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date/Time</TableHead>
                <TableHead>Log Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="max-w-[200px]">Subject</TableHead>
                <TableHead>Staff Involved</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleLogEntries.map((entry) => (
                <TableRow 
                  key={entry.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => viewEntry(entry)}
                >
                  <TableCell>{format(entry.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>
                    <h3>LogType</h3>
                    {/* <LogTypeTag type={entry.type} /> */}
                  </TableCell>
                  <TableCell>{entry.client}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{entry.subject}</TableCell>
                  <TableCell>{entry.staffInvolved || '-'}</TableCell>
                  <TableCell><PriorityBadge priority={entry.priority} /></TableCell>
                  <TableCell><StatusBadge status={entry.status} /></TableCell>
                  <TableCell>{entry.owner}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        editEntry(entry);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Entry Form Modal */}
      <Dialog open={isEntryFormOpen} onOpenChange={setIsEntryFormOpen}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEntry 
                ? (isViewingEntry ? 'View Log Entry' : 'Edit Log Entry') 
                : 'Create New Log Entry'}
            </DialogTitle>
          </DialogHeader>
          <ActivityLogEntryForm 
            entry={selectedEntry} 
            isViewMode={isViewingEntry}
            onSubmit={() => setIsEntryFormOpen(false)}
            onCancel={() => setIsEntryFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityLog;
