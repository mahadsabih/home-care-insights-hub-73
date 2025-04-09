
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  CheckSquare, 
  Users, 
  Briefcase, 
  Calendar, 
  Lightbulb, 
  FileSpreadsheet 
} from "lucide-react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: { id: string; name: string; icon: string }) => void;
}

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("FileSpreadsheet");
  
  const iconOptions = [
    { value: "CheckSquare", label: "Tasks", icon: <CheckSquare className="h-4 w-4" /> },
    { value: "Users", label: "People", icon: <Users className="h-4 w-4" /> },
    { value: "Briefcase", label: "Work", icon: <Briefcase className="h-4 w-4" /> },
    { value: "Calendar", label: "Calendar", icon: <Calendar className="h-4 w-4" /> },
    { value: "Lightbulb", label: "Ideas", icon: <Lightbulb className="h-4 w-4" /> },
    { value: "FileSpreadsheet", label: "Document", icon: <FileSpreadsheet className="h-4 w-4" /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    
    // Create a new category with a unique ID
    const newCategory = {
      id: uuidv4(),
      name: categoryName.trim(),
      icon: selectedIcon,
    };
    
    onAddCategory(newCategory);
    resetForm();
  };
  
  const resetForm = () => {
    setCategoryName("");
    setSelectedIcon("FileSpreadsheet");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              autoFocus
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={selectedIcon} onValueChange={setSelectedIcon}>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      {option.icon}
                      <span className="ml-2">{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit">Add Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
