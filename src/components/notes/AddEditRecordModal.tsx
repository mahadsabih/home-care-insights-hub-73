
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddEditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: any | null;
  categoryName: string;
  customHeaders?: string[];
  onSave: (record: any) => void;
}

const AddEditRecordModal = ({
  isOpen,
  onClose,
  record,
  categoryName,
  customHeaders = [],
  onSave,
}: AddEditRecordModalProps) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const isEditMode = !!record;
  
  // Initialize form values when the record changes
  useEffect(() => {
    if (record) {
      setFormValues({ ...record });
    } else {
      // For new records, initialize with empty values based on headers
      const emptyRecord: Record<string, string> = {};
      
      // Use custom headers if available, otherwise use preset templates
      if (customHeaders.length > 0) {
        customHeaders.forEach(header => {
          emptyRecord[header] = "";
        });
      } else {
        // Fallback to preset templates
        setFormValues(getEmptyRecordTemplate(categoryName));
        return;
      }
      
      setFormValues(emptyRecord);
    }
  }, [record, categoryName, customHeaders, isOpen]);
  
  // Get empty record template based on category name
  const getEmptyRecordTemplate = (category: string) => {
    switch (category.toLowerCase()) {
      case "tasks":
        return { title: "", status: "", priority: "", dueDate: "" };
      case "contacts":
        return { name: "", email: "", phone: "", company: "" };
      case "projects":
        return { name: "", client: "", deadline: "", status: "" };
      case "meetings":
        return { title: "", date: "", time: "", participants: "" };
      case "ideas":
        return { title: "", description: "", category: "" };
      default:
        return {};
    }
  };
  
  // Determine if a field should be a textarea (for longer text content)
  const isTextareaField = (field: string) => {
    return field.toLowerCase().includes('description') || 
           field.toLowerCase().includes('notes') || 
           field.toLowerCase().includes('content');
  };
  
  // Determine if a field should be a select (based on common field names)
  const getSelectOptions = (field: string) => {
    const fieldLower = field.toLowerCase();
    
    if (fieldLower === 'status') {
      return ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled', 'Pending Review'];
    }
    
    if (fieldLower === 'priority') {
      return ['Low', 'Medium', 'High', 'Critical'];
    }
    
    if (fieldLower.includes('type')) {
      return ['Internal', 'External', 'Client', 'Personal', 'Business'];
    }
    
    return null;
  };

  // Determine field type based on field name
  const getFieldType = (field: string) => {
    const fieldLower = field.toLowerCase();
    
    if (fieldLower.includes('date')) {
      return 'date';
    }
    
    if (fieldLower.includes('time')) {
      return 'time';
    }
    
    if (fieldLower.includes('email')) {
      return 'email';
    }
    
    if (fieldLower.includes('phone')) {
      return 'tel';
    }
    
    return 'text';
  };
  
  // Format header for display
  const formatHeader = (header: string) => {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };
  
  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formValues);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? `Edit ${categoryName} Record` : `Add New ${categoryName} Record`}
          </DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update the record fields below." 
              : `Create a new record in the ${categoryName} category.`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {Object.keys(formValues).map(field => {
              if (field === "id") return null;
              
              const selectOptions = getSelectOptions(field);
              
              return (
                <div key={field} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field} className="text-right">
                    {formatHeader(field)}
                  </Label>
                  
                  {isTextareaField(field) ? (
                    <Textarea
                      id={field}
                      value={formValues[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="col-span-3"
                      rows={3}
                    />
                  ) : selectOptions ? (
                    <Select
                      value={formValues[field] || ""}
                      onValueChange={(value) => handleChange(field, value)}
                    >
                      <SelectTrigger id={field} className="col-span-3">
                        <SelectValue placeholder={`Select ${formatHeader(field)}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectOptions.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field}
                      type={getFieldType(field)}
                      value={formValues[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="col-span-3"
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditRecordModal;
