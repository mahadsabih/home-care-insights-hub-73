
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckSquare, Users, Briefcase, Calendar, Lightbulb, PlusCircle, Settings } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onImportExcel,
}: SidebarProps) => {
  // Map icon names to Lucide icons
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

  return (
    <div className="w-64 border-r bg-white flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Categories</h2>
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          {categories.map((category) => (
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
          onClick={() => {
            // This would open a modal to create a new category in a real app
            alert("This would create a new category in a real app");
          }}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Category
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
