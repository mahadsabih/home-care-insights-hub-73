
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import QuickActions from "@/components/dashboard/QuickActions";
import ShiftOverview from "@/components/dashboard/ShiftOverview";
import ActivityLogSummary from "@/components/dashboard/ActivityLogSummary";
import DataVisualization from "@/components/dashboard/DataVisualization";
import LiveCoverageMap from "@/components/dashboard/LiveCoverageMap";
import { FileSpreadsheet } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-4">
            <Button asChild variant="outline">
              <Link to="/activity-log">Activity Log</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/roster">View Roster</Link>
            </Button>
            <Button asChild>
              <Link to="/notes">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Notes & Excel Data
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <QuickActions />
          <ShiftOverview />
          <ActivityLogSummary />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DataVisualization />
          </div>
          <LiveCoverageMap />
        </div>
      </main>
    </div>
  );
};

export default Index;
