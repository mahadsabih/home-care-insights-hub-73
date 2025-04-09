
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

interface AddEditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: any | null;
  categoryName: string;
  onSave: (record: any) => void;
}

const AddEditRecordModal = ({
  isOpen,
  onClose,
  record,
  categoryName,
  onSave,
}: AddEditRecordModalProps) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const isEditMode = !!record;
  
  // Initialize form values when the record changes
  useEffect(() => {
    if (record) {
      setFormValues({ ...record });
    } else {
      // For new records, initialize with empty values based on category
      setFormValues(getEmptyRecordTemplate(categoryName));
    }
  }, [record, categoryName]);
  
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
  
  // Handle form field changes
  const handleChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedRecord = isEditMode ? { ...record, ...formValues } : formValues;
    onSave(savedRecord);
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
            {Object.keys(formValues).map(field => (
              field !== "id" && (
                <div key={field} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field} className="text-right capitalize">
                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Label>
                  <Input
                    id={field}
                    type={field.toLowerCase().includes("date") ? "date" : "text"}
                    value={formValues[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="col-span-3"
                  />
                </div>
              )
            ))}
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
