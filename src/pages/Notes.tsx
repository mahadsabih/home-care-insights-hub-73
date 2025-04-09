import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, FileSpreadsheet, SlidersHorizontal, Filter } from "lucide-react";
import Sidebar from "@/components/notes/Sidebar";
import RecordsTable from "@/components/notes/RecordsTable";
import AddEditRecordModal from "@/components/notes/AddEditRecordModal";
import ImportExcelModal from "@/components/notes/ImportExcelModal";
import CustomTableHeadersModal from "@/components/notes/CustomTableHeadersModal";
import Navbar from "@/components/layout/Navbar";

const initialCategories = [
  { id: uuidv4(), name: "Tasks", icon: "CheckSquare" },
  { id: uuidv4(), name: "Contacts", icon: "Users" },
  { id: uuidv4(), name: "Projects", icon: "Briefcase" },
  { id: uuidv4(), name: "Meetings", icon: "Calendar" },
  { id: uuidv4(), name: "Ideas", icon: "Lightbulb" },
];

const sampleRecords = {
  "Tasks": [
    { id: uuidv4(), title: "Complete client assessment", status: "In Progress", priority: "High", dueDate: "2023-04-15" },
    { id: uuidv4(), title: "Update care plan", status: "Pending", priority: "Medium", dueDate: "2023-04-20" }
  ],
  "Contacts": [
    { id: uuidv4(), name: "Sarah Johnson", email: "sarah.j@example.com", phone: "555-123-4567", company: "Care Health Services" },
    { id: uuidv4(), name: "Michael Brown", email: "mbrown@example.com", phone: "555-987-6543", company: "Community Nursing" }
  ],
  "Projects": [
    { id: uuidv4(), name: "Care Quality Assessment", client: "Smithfield Care Home", deadline: "2023-05-30", status: "Active" },
    { id: uuidv4(), name: "Staff Training Program", client: "Internal", deadline: "2023-06-15", status: "Planning" }
  ]
};

const Notes = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0]);
  const [records, setRecords] = useState<Record<string, any[]>>(sampleRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
  
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isCustomHeadersModalOpen, setIsCustomHeadersModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  
  const [customHeaders, setCustomHeaders] = useState<Record<string, string[]>>({
    "Tasks": ["title", "status", "priority", "dueDate"],
    "Contacts": ["name", "email", "phone", "company"],
    "Projects": ["name", "client", "deadline", "status"],
    "Meetings": ["title", "date", "time", "participants"],
    "Ideas": ["title", "description", "category"]
  });

  const handleAddCategory = (category) => {
    setCategories(prev => [...prev, category]);
    
    setRecords(prev => ({
      ...prev,
      [category.name]: []
    }));
    
    setCustomHeaders(prev => ({
      ...prev,
      [category.name]: ["title", "description"]
    }));
    
    setSelectedCategory(category);
    toast.success(`Category "${category.name}" created successfully`);
  };

  useEffect(() => {
    if (!selectedCategory) return;
    
    const categoryRecords = records[selectedCategory.name] || [];
    
    if (searchTerm.trim() === "") {
      setFilteredRecords(categoryRecords);
    } else {
      const filtered = categoryRecords.filter((record) => {
        return Object.values(record).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredRecords(filtered);
    }
  }, [searchTerm, selectedCategory, records]);

  useEffect(() => {
    if (selectedCategory && !records[selectedCategory.name]) {
      setRecords((prev) => ({ ...prev, [selectedCategory.name]: [] }));
    }
    
    if (selectedCategory && !customHeaders[selectedCategory.name]) {
      setCustomHeaders((prev) => ({ ...prev, [selectedCategory.name]: [] }));
    }
  }, [selectedCategory]);
  
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };
  
  const handleAddRecord = () => {
    setCurrentRecord(null);
    setIsAddEditModalOpen(true);
  };
  
  const handleEditRecord = (record) => {
    setCurrentRecord(record);
    setIsAddEditModalOpen(true);
  };
  
  const handleDeleteRecord = (id) => {
    if (selectedCategory) {
      const categoryName = selectedCategory.name;
      const updatedRecords = records[categoryName].filter(record => record.id !== id);
      
      setRecords(prev => ({
        ...prev,
        [categoryName]: updatedRecords
      }));
      
      toast.success("Record deleted successfully");
    }
  };
  
  const handleSaveRecord = (recordData) => {
    if (!selectedCategory) return;
    
    const categoryName = selectedCategory.name;
    let updatedRecords;
    
    if (currentRecord) {
      updatedRecords = records[categoryName].map(record => 
        record.id === currentRecord.id ? { ...recordData, id: currentRecord.id } : record
      );
      toast.success("Record updated successfully");
    } else {
      const newRecord = { ...recordData, id: uuidv4() };
      updatedRecords = [...(records[categoryName] || []), newRecord];
      toast.success("Record added successfully");
    }
    
    setRecords(prev => ({
      ...prev,
      [categoryName]: updatedRecords
    }));
    
    setIsAddEditModalOpen(false);
  };
  
  const handleImportExcel = (data, sheetName) => {
    if (!data || !data.length) return;
    
    const newCategoryId = uuidv4();
    const newCategory = {
      id: newCategoryId,
      name: sheetName,
      icon: "FileSpreadsheet"
    };
    
    const headers = Object.keys(data[0]);
    
    setCategories(prev => [...prev, newCategory]);
    
    const recordsWithIds = data.map(record => ({ ...record, id: uuidv4() }));
    
    setRecords(prev => ({
      ...prev,
      [sheetName]: recordsWithIds
    }));
    
    setCustomHeaders(prev => ({
      ...prev,
      [sheetName]: headers
    }));
    
    setSelectedCategory(newCategory);
    setIsImportModalOpen(false);
    
    toast.success(`Imported ${data.length} records to "${sheetName}"`);
  };
  
  const handleSaveCustomHeaders = (headers) => {
    if (!selectedCategory) return;
    
    setCustomHeaders(prev => ({
      ...prev,
      [selectedCategory.name]: headers
    }));
    
    setIsCustomHeadersModalOpen(false);
    toast.success("Table headers updated successfully");
  };
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onImportExcel={() => setIsImportModalOpen(true)}
          onAddCategory={handleAddCategory}
        />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{selectedCategory?.name || "Notes"}</h1>
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search records..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <Button 
                variant="outline" 
                onClick={() => setIsCustomHeadersModalOpen(true)} 
                title="Customize Headers"
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Customize
              </Button>
              
              <Button onClick={handleAddRecord}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
          
          <RecordsTable
            records={filteredRecords}
            customHeaders={selectedCategory ? customHeaders[selectedCategory.name] : []}
            onEditRecord={handleEditRecord}
            onDeleteRecord={handleDeleteRecord}
          />
        </div>
      </div>
      
      <AddEditRecordModal
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        record={currentRecord}
        categoryName={selectedCategory?.name || ""}
        customHeaders={selectedCategory ? customHeaders[selectedCategory.name] : []}
        onSave={handleSaveRecord}
      />
      
      <ImportExcelModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportExcel}
      />
      
      <CustomTableHeadersModal
        isOpen={isCustomHeadersModalOpen}
        onClose={() => setIsCustomHeadersModalOpen(false)}
        categoryName={selectedCategory?.name || ""}
        headers={selectedCategory ? customHeaders[selectedCategory.name] || [] : []}
        onSave={handleSaveCustomHeaders}
      />
    </div>
  );
};

export default Notes;
