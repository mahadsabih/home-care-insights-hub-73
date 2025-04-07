import React from "react";
import { Users, Briefcase, ClipboardCheck, ClipboardList } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import StatCard from "@/components/dashboard/StatCard";
import ShiftOverview from "@/components/dashboard/ShiftOverview";
import ActivityLogSummary from "@/components/dashboard/ActivityLogSummary";
import QuickActions from "@/components/dashboard/QuickActions";
import DataVisualization from "@/components/dashboard/DataVisualization";
import LiveCoverageMap from "@/components/dashboard/LiveCoverageMap";

const Index = () => {
  // Current date formatting
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());
  
  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}, Jane</h1>
            <p className="text-muted-foreground">{currentDate}</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Active Clients" 
            value={82}
            icon={Users}
            description="Receiving care today"
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard 
            title="Staff On Duty" 
            value={45}
            icon={Briefcase} 
            description="Currently working" 
          />
          <StatCard 
            title="Shifts Scheduled" 
            value={75}
            icon={ClipboardCheck} 
            description="For today" 
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Pending Tasks" 
            value={12} 
            icon={ClipboardList}
            description="Require attention"
            trend={{ value: 2, isPositive: false }}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-7 md:col-span-1 lg:col-span-3">
            <ShiftOverview />
          </div>
          <div className="col-span-7 md:col-span-1 lg:col-span-4">
            <ActivityLogSummary />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-7 md:col-span-1 lg:col-span-3">
            <QuickActions />
          </div>
          <div className="col-span-7 md:col-span-1 lg:col-span-4">
            <LiveCoverageMap />
          </div>
        </div>
        
        <div className="grid gap-6">
          <DataVisualization />
        </div>
      </div>
    </div>
  );
};

export default Index;
