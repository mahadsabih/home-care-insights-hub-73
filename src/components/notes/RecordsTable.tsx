
import { useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowUpDown, Edit, Trash, Filter } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface RecordsTableProps {
  records: any[];
  customHeaders?: string[];
  onEditRecord: (record: any) => void;
  onDeleteRecord: (id: string) => void;
}

const RecordsTable = ({ 
  records, 
  customHeaders = [], 
  onEditRecord, 
  onDeleteRecord 
}: RecordsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  // Dynamically create columns based on the headers or first record properties
  const columns = useMemo(() => {
    if (!records.length && !customHeaders.length) return [];
    
    // Determine which headers to use
    let columnKeys: string[] = [];
    
    if (customHeaders.length > 0) {
      // Use custom headers if provided
      columnKeys = customHeaders;
    } else if (records.length > 0) {
      // Otherwise derive from first record
      const firstRecord = records[0];
      columnKeys = Object.keys(firstRecord).filter(key => key !== 'id');
    }
    
    // Format header for display
    const formatHeader = (header: string) => {
      return header
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
    };
    
    // Create columns based on headers
    const generatedColumns = columnKeys.map(key => ({
      id: key,
      accessorKey: key,
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="whitespace-nowrap"
            >
              {formatHeader(key)}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Filter className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-3" align="start">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Filter {formatHeader(key)}</h4>
                  <Input 
                    placeholder="Enter value..."
                    value={columnFilters[key] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setColumnFilters(prev => ({
                        ...prev,
                        [key]: value
                      }));
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
      cell: ({ row }) => {
        const value = row.getValue(key);
        return <div>{value !== undefined ? String(value) : ""}</div>;
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const value = row.getValue(columnId);
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      }
    }));
    
    // Add actions column
    return [
      ...generatedColumns,
      {
        id: "actions",
        cell: ({ row }) => {
          const record = row.original;
          
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onEditRecord(record)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDeleteRecord(record.id)} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [records, customHeaders, onEditRecord, onDeleteRecord, columnFilters]);

  // Apply column filters from our state to the table
  const columnFiltersArray = useMemo(() => {
    return Object.entries(columnFilters)
      .filter(([_, value]) => value && value.trim() !== '')
      .map(([id, value]) => ({
        id,
        value
      }));
  }, [columnFilters]);

  // Set up the table instance
  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters: columnFiltersArray,
    },
  });

  const clearFilter = (columnId: string) => {
    setColumnFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[columnId];
      return newFilters;
    });
  };

  if (!records.length) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-muted/30 rounded-lg border border-dashed">
        <p className="text-muted-foreground mb-2">No records found</p>
        <p className="text-sm text-muted-foreground">Add a new record or import data from an Excel file</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Active filters display */}
      {Object.keys(columnFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active filters:</span>
          {Object.entries(columnFilters).map(([key, value]) => (
            value && (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value}
                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter(key)} />
              </Badge>
            )
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => setColumnFilters({})}
          >
            Clear all
          </Button>
        </div>
      )}
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No matching records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecordsTable;
