
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
import { Plus, Trash2, GripVertical } from "lucide-react";

interface CustomTableHeadersModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  headers: string[];
  onSave: (headers: string[]) => void;
}

const CustomTableHeadersModal = ({
  isOpen,
  onClose,
  categoryName,
  headers,
  onSave,
}: CustomTableHeadersModalProps) => {
  const [customHeaders, setCustomHeaders] = useState<string[]>([]);
  const [newHeader, setNewHeader] = useState("");
  
  useEffect(() => {
    setCustomHeaders([...headers]);
  }, [headers, isOpen]);
  
  const handleAddHeader = () => {
    if (newHeader.trim() === "") return;
    
    // Convert to camelCase for consistency
    const camelCaseHeader = newHeader
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    
    setCustomHeaders([...customHeaders, camelCaseHeader]);
    setNewHeader("");
  };
  
  const handleRemoveHeader = (index: number) => {
    const updated = [...customHeaders];
    updated.splice(index, 1);
    setCustomHeaders(updated);
  };
  
  const handleMoveHeader = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= customHeaders.length) return;
    
    const updated = [...customHeaders];
    const [removed] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, removed);
    setCustomHeaders(updated);
  };
  
  const handleSave = () => {
    onSave(customHeaders);
  };
  
  // Display a human-readable version of the header
  const formatHeaderForDisplay = (header: string) => {
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Table Headers</DialogTitle>
          <DialogDescription>
            {categoryName ? `Edit table headers for "${categoryName}"` : "Edit table headers"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Current headers */}
          <div>
            <Label className="mb-2 block">Current Headers</Label>
            <div className="space-y-2">
              {customHeaders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No headers added yet.</p>
              ) : (
                customHeaders.map((header, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-50 cursor-grab"
                      title="Drag to reorder"
                      onClick={() => {}}
                    >
                      <GripVertical className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 border rounded-md px-3 py-2 text-sm">
                      {formatHeaderForDisplay(header)}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Move up"
                        onClick={() => handleMoveHeader(index, index - 1)}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Move down"
                        onClick={() => handleMoveHeader(index, index + 1)}
                        disabled={index === customHeaders.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        title="Remove header"
                        onClick={() => handleRemoveHeader(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Add new header */}
          <div>
            <Label htmlFor="new-header">Add Header</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="new-header"
                placeholder="Enter header name"
                value={newHeader}
                onChange={(e) => setNewHeader(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddHeader()}
              />
              <Button variant="secondary" onClick={handleAddHeader}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Press Enter or click the + button to add
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Headers</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomTableHeadersModal;
