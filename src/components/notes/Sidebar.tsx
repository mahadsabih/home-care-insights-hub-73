import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  FileSpreadsheet,
  CheckSquare,
  Users,
  Briefcase,
  Calendar,
  Lightbulb,
  PlusCircle,
  Settings,
  Filter,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddCategoryModal from "./AddCategoryModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  categories: {
    id: string;
    name: string;
    icon: string;
  }[];
  selectedCategory: {
    id: string;
    name: string;
    icon: string;
  };
  onSelectCategory: (category: any) => void;
  onImportExcel: () => void;
  onAddCategory: (category: { id: string; name: string; icon: string }) => void;
}

const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onImportExcel,
  onAddCategory,
}: SidebarProps) => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "CheckSquare":
        return <CheckSquare className="h-5 w-5" />;
      case "Users":
        return <Users className="h-5 w-5" />;
      case "Briefcase":
        return <Briefcase className="h-5 w-5" />;
      case "Calendar":
        return <Calendar className="h-5 w-5" />;
      case "Lightbulb":
        return <Lightbulb className="h-5 w-5" />;
      case "FileSpreadsheet":
      default:
        return <FileSpreadsheet className="h-5 w-5" />;
    }
  };

  const handleAddCategory = (category: { id: string; name: string; icon: string }) => {
    onAddCategory(category);
    setIsAddCategoryModalOpen(false);
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="w-64 border-r bg-white flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Categories</h2>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="px-3 py-2 border-b">
        <Input
          placeholder="Filter categories..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="mb-2"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Filter className="h-4 w-4 mr-2" />
              Filter Options
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="space-y-2">
              <h4 className="font-medium">Filter by type</h4>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addFilter("Tasks")}
                  >
                    <CheckSquare className="h-4 w-4 mr-1" />
                    Tasks
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addFilter("Contacts")}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Contacts
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addFilter("Projects")}
                  >
                    <Briefcase className="h-4 w-4 mr-1" />
                    Projects
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addFilter("Meetings")}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Meetings
                  </Button>
                </div>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm text-muted-foreground">Active filters:</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeFilters.map(filter => (
                    <Badge key={filter} variant="outline" className="flex items-center gap-1">
                      {filter}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          {filteredCategories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left mb-1 font-normal",
                selectedCategory.id === category.id ? "bg-muted" : ""
              )}
              onClick={() => onSelectCategory(category)}
            >
              {getIcon(category.icon)}
              <span className="ml-3">{category.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button
          variant="outline"
          onClick={onImportExcel}
          className="w-full justify-start"
        >
          <Upload className="h-5 w-5 mr-2" />
          Import Excel
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start mt-2"
          onClick={() => setIsAddCategoryModalOpen(true)}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Category
        </Button>
      </div>
      
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default Sidebar;
