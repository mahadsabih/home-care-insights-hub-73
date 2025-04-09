
import { useState, ChangeEvent } from "react";
import { read, utils } from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileSpreadsheet, Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ImportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[], sheetName: string) => void;
}

const ImportExcelModal = ({ isOpen, onClose, onImport }: ImportExcelModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [error, setError] = useState<string>("");
  
  // Handle file selection
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      setFile(null);
      setSheets([]);
      setSelectedSheet("");
      setPreviewData([]);
      return;
    }
    
    // Check file type
    if (!selectedFile.name.match(/\.(xlsx|xls|csv)$/)) {
      setError("Please select an Excel file (.xlsx, .xls) or CSV file");
      return;
    }
    
    setFile(selectedFile);
    
    try {
      // Read the file
      const data = await selectedFile.arrayBuffer();
      const workbook = read(data);
      
      // Get sheet names
      const sheetNames = workbook.SheetNames;
      setSheets(sheetNames);
      
      // Auto-select first sheet and set its name as category name
      if (sheetNames.length > 0) {
        setSelectedSheet(sheetNames[0]);
        setCategoryName(sheetNames[0]);
        
        // Load preview data
        const worksheet = workbook.Sheets[sheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);
        setPreviewData(jsonData.slice(0, 5)); // Show first 5 rows
      }
    } catch (err) {
      console.error("Error reading Excel file:", err);
      setError("Error reading Excel file. Please make sure it's a valid Excel file.");
    }
  };
  
  // Handle sheet selection
  const handleSheetChange = (sheetName: string) => {
    if (!file) return;
    
    setSelectedSheet(sheetName);
    setCategoryName(sheetName);
    
    try {
      const data = read(file, { type: 'array' });
      const worksheet = data.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet);
      setPreviewData(jsonData.slice(0, 5)); // Show first 5 rows
    } catch (err) {
      console.error("Error reading sheet:", err);
      setError("Error reading sheet data");
    }
  };
  
  // Handle import
  const handleImport = async () => {
    if (!file || !selectedSheet) {
      setError("Please select a file and sheet to import");
      return;
    }
    
    if (!categoryName.trim()) {
      setError("Please enter a category name");
      return;
    }
    
    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[selectedSheet];
      const jsonData = utils.sheet_to_json(worksheet);
      
      // Pass data and category name to parent component
      onImport(jsonData, categoryName);
    } catch (err) {
      console.error("Error importing data:", err);
      setError("Error importing data. Please try again.");
    }
  };
  
  // Reset the form when closing
  const handleClose = () => {
    setFile(null);
    setSheets([]);
    setSelectedSheet("");
    setPreviewData([]);
    setCategoryName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import Data from Excel</DialogTitle>
          <DialogDescription>
            Upload an Excel file to preview and import data as a new category or into an existing one.
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-4 py-4">
          {/* File upload section */}
          <div className="grid gap-2">
            <Label htmlFor="excel-file">Excel File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="flex-1"
              />
              {file && <Check className="text-green-600 h-5 w-5" />}
            </div>
          </div>
          
          {/* Sheet selection */}
          {sheets.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="sheet-select">Select Sheet</Label>
              <Select value={selectedSheet} onValueChange={handleSheetChange}>
                <SelectTrigger id="sheet-select">
                  <SelectValue placeholder="Select a sheet" />
                </SelectTrigger>
                <SelectContent>
                  {sheets.map((sheet) => (
                    <SelectItem key={sheet} value={sheet}>
                      {sheet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Category name input */}
          {selectedSheet && (
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
          )}
          
          {/* Preview data */}
          {previewData.length > 0 && (
            <div className="grid gap-2">
              <Label>Preview (First 5 rows)</Label>
              <ScrollArea className="h-60 border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(previewData[0]).map((key) => (
                        <TableHead key={key}>
                          {key}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, i) => (
                          <TableCell key={i}>{String(value)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              {previewData.length === 5 && (
                <p className="text-sm text-muted-foreground">
                  Showing first 5 rows. Full import will include all rows.
                </p>
              )}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!file || !selectedSheet || !categoryName.trim()}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportExcelModal;
