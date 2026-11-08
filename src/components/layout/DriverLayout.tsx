import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Map,
  BookOpen,
  Heart,
  Car,
  User,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAppStore } from '../../store';
import DriverSidebar from './DriverSidebar';
import DriverBottomNav from './DriverBottomNav';

const DriverLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppStore((state) => state.user);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <DriverSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between md:hidden sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="font-bold text-primary">MY_PARKING</h1>
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
            {user?.name?.[0]}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <DriverBottomNav />
      </div>
    </div>
  );
};

export default DriverLayout;
