
import React from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
          >
            <rect width="40" height="40" rx="10" fill="#2563EB" />
            <path d="M19.5 12V28M19.5 12H24M19.5 12H15M19.5 28H24M19.5 28H15M19.5 20H24M19.5 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-lg font-semibold">CareConnect</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium transition-colors text-primary">
            Dashboard
          </Link>
          <Link to="/roster" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Roster
          </Link>
          <Link to="/staff" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Staff
          </Link>
          <Link to="/clients" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Clients
          </Link>
          <Link to="/activity-log" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Activity Log
          </Link>
          <Link to="/reports" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Reports
          </Link>
          <Link to="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Settings
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
