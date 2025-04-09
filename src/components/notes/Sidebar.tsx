import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet, CheckSquare, Users, Briefcase, Calendar, Lightbulb, PlusCircle, Settings, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddCategoryModal from "./AddCategoryModal";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
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
  onAddCategory: (category: {
    id: string;
    name: string;
    icon: string;
  }) => void;
}
const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onImportExcel,
  onAddCategory
}: SidebarProps) => {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
  const handleAddCategory = (category: {
    id: string;
    name: string;
    icon: string;
  }) => {
    onAddCategory(category);
    setIsAddCategoryModalOpen(false);
  };
  const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(categoryFilter.toLowerCase()));
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };
  return <div className={cn("border-r bg-white flex flex-col h-full transition-all duration-300", isCollapsed ? "w-16" : "w-64")}>
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && <h2 className="font-semibold text-lg">Categories</h2>}
        <div className="flex items-center ml-auto">
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8" title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          {!isCollapsed && <Button variant="ghost" size="icon" title="Settings" className="h-8 w-8">
              <Settings className="h-5 w-5" />
            </Button>}
        </div>
      </div>
      
      <Collapsible open={!isCollapsed} className="flex-1 flex flex-col">
        
        
        <ScrollArea className="flex-1">
          <div className={cn("py-2", isCollapsed ? "px-2" : "px-3")}>
            {filteredCategories.map(category => <Button key={category.id} variant="ghost" className={cn("w-full justify-start text-left mb-1 font-normal", selectedCategory.id === category.id ? "bg-muted" : "", isCollapsed ? "p-2" : "")} onClick={() => onSelectCategory(category)}>
                <div className={cn("flex items-center", isCollapsed ? "justify-center" : "")}>
                  {getIcon(category.icon)}
                  {!isCollapsed && <span className="ml-3">{category.name}</span>}
                </div>
              </Button>)}
          </div>
        </ScrollArea>
        
        <div className={cn("border-t", isCollapsed ? "p-2" : "p-4")}>
          {!isCollapsed ? <>
              <Button variant="outline" onClick={onImportExcel} className="w-full justify-start">
                <Upload className="h-5 w-5 mr-2" />
                Import Excel
              </Button>
              <Button variant="ghost" className="w-full justify-start mt-2" onClick={() => setIsAddCategoryModalOpen(true)}>
                <PlusCircle className="h-5 w-5 mr-2" />
                New Category
              </Button>
            </> : <>
              <Button variant="outline" size="icon" onClick={onImportExcel} className="w-full mb-2 flex justify-center" title="Import Excel">
                <Upload className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-full flex justify-center" onClick={() => setIsAddCategoryModalOpen(true)} title="New Category">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </>}
        </div>
      </Collapsible>
      
      <AddCategoryModal isOpen={isAddCategoryModalOpen} onClose={() => setIsAddCategoryModalOpen(false)} onAddCategory={handleAddCategory} />
    </div>;
};
export default Sidebar;