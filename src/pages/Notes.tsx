
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/notes/Sidebar";
import RecordsTable from "@/components/notes/RecordsTable";
import AddEditRecordModal from "@/components/notes/AddEditRecordModal";
import ImportExcelModal from "@/components/notes/ImportExcelModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Upload, FileSpreadsheet } from "lucide-react";

// Sample categories/sheet names for demonstration (would come from database in a real app)
const initialCategories = [
  { id: "1", name: "Tasks", icon: "CheckSquare" },
  { id: "2", name: "Contacts", icon: "Users" },
  { id: "3", name: "Projects", icon: "Briefcase" },
  { id: "4", name: "Meetings", icon: "Calendar" },
  { id: "5", name: "Ideas", icon: "Lightbulb" }
];

// Sample initial data for each category (would come from database in a real app)
const initialData = {
  "1": [
    { id: "t1", title: "Complete project proposal", status: "In Progress", priority: "High", dueDate: "2025-04-15" },
    { id: "t2", title: "Review marketing materials", status: "Not Started", priority: "Medium", dueDate: "2025-04-20" },
    { id: "t3", title: "Update client documentation", status: "Completed", priority: "Low", dueDate: "2025-04-10" },
  ],
  "2": [
    { id: "c1", name: "John Smith", email: "john@example.com", phone: "555-1234", company: "ABC Corp" },
    { id: "c2", name: "Emma Johnson", email: "emma@example.com", phone: "555-5678", company: "XYZ Ltd" },
  ],
  "3": [
    { id: "p1", name: "Website Redesign", client: "ABC Corp", deadline: "2025-05-15", status: "In Progress" },
    { id: "p2", name: "Mobile App Development", client: "XYZ Ltd", deadline: "2025-06-30", status: "Planning" },
  ],
  "4": [
    { id: "m1", title: "Client Review", date: "2025-04-12", time: "10:00", participants: "John, Emma, Michael" },
    { id: "m2", title: "Team Planning", date: "2025-04-14", time: "14:00", participants: "All Team" },
  ],
  "5": [
    { id: "i1", title: "New Feature Concept", description: "Add voice recognition to the app", category: "Product" },
    { id: "i2", title: "Marketing Campaign", description: "Social media push for Q2", category: "Marketing" },
  ]
};

const Notes = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [records, setRecords] = useState(initialData[selectedCategory.id] || []);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Update records when selected category changes
  useEffect(() => {
    setRecords(initialData[selectedCategory.id] || []);
  }, [selectedCategory]);

  // Handle adding a new record
  const handleAddRecord = () => {
    setCurrentRecord(null);
    setIsAddEditModalOpen(true);
  };

  // Handle editing a record
  const handleEditRecord = (record) => {
    setCurrentRecord(record);
    setIsAddEditModalOpen(true);
  };

  // Handle saving a record (add or edit)
  const handleSaveRecord = (record) => {
    if (currentRecord) {
      // Edit existing record
      const updatedRecords = records.map(r => r.id === record.id ? record : r);
      setRecords(updatedRecords);
      toast({
        title: "Record updated",
        description: "The record has been updated successfully.",
      });
    } else {
      // Add new record with a unique ID
      const newRecord = { ...record, id: `${selectedCategory.id[0]}${Date.now()}` };
      setRecords([...records, newRecord]);
      toast({
        title: "Record added",
        description: "New record has been added successfully.",
      });
    }
    setIsAddEditModalOpen(false);
  };

  // Handle deleting a record
  const handleDeleteRecord = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    toast({
      title: "Record deleted",
      description: "The record has been deleted successfully.",
    });
  };

  // Handle importing data from Excel
  const handleImportData = (newData, categoryName) => {
    // Check if category exists, create if not
    let categoryId = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase())?.id;
    
    if (!categoryId) {
      // Create a new category with a default icon
      const newCategory = {
        id: `${categories.length + 1}`,
        name: categoryName,
        icon: "FileSpreadsheet"
      };
      setCategories([...categories, newCategory]);
      categoryId = newCategory.id;
      
      // Initialize empty data for this category
      initialData[categoryId] = [];
    }
    
    // Add IDs to imported records
    const recordsWithIds = newData.map((record, index) => ({
      ...record,
      id: `${categoryId[0]}imp${index}${Date.now()}`
    }));
    
    // Merge with existing records (this is just for UI demo, in real app would use database)
    initialData[categoryId] = [...(initialData[categoryId] || []), ...recordsWithIds];
    
    // Update current view if we're looking at the category being imported
    if (selectedCategory.id === categoryId) {
      setRecords([...records, ...recordsWithIds]);
    }
    
    // Select the category we just imported to
    const categoryToSelect = categories.find(cat => cat.id === categoryId) || 
                           categories[categories.length - 1]; // Fallback to last category (newly created)
    setSelectedCategory(categoryToSelect);
    
    toast({
      title: "Data imported successfully",
      description: `${recordsWithIds.length} records imported to ${categoryName}`,
    });
    
    setIsImportModalOpen(false);
  };

  // Filter records based on search query
  const filteredRecords = records.filter(record => {
    const searchLower = searchQuery.toLowerCase();
    // Search all fields of the record
    return Object.values(record).some(value => 
      value && value.toString().toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        categories={categories} 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onImportExcel={() => setIsImportModalOpen(true)}
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar with search and buttons */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <h1 className="text-2xl font-semibold">{selectedCategory.name}</h1>
            <div className="flex-1 max-w-sm">
              <Input
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={() => setIsImportModalOpen(true)} variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Excel
            </Button>
            <Button onClick={handleAddRecord}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
        </div>
        
        {/* Table */}
        <div className="flex-1 overflow-auto p-6">
          <RecordsTable
            records={filteredRecords}
            onEditRecord={handleEditRecord}
            onDeleteRecord={handleDeleteRecord}
          />
        </div>
      </div>
      
      {/* Modals */}
      {isAddEditModalOpen && (
        <AddEditRecordModal
          isOpen={isAddEditModalOpen}
          onClose={() => setIsAddEditModalOpen(false)}
          record={currentRecord}
          categoryName={selectedCategory.name}
          onSave={handleSaveRecord}
        />
      )}
      
      {isImportModalOpen && (
        <ImportExcelModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImportData}
        />
      )}
    </div>
  );
};

export default Notes;
