import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  MessageSquare,
} from 'lucide-react';
import { useAppStore } from '../../store';
import { cn } from '../../lib/utils';

interface DriverSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const DriverSidebar: React.FC<DriverSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/driver/dashboard' },
    { icon: Search, label: 'Search Parking', path: '/driver/search' },
    { icon: Map, label: 'Map View', path: '/driver/map' },
    { icon: BookOpen, label: 'My Bookings', path: '/driver/bookings' },
    { icon: Heart, label: 'Favorites', path: '/driver/favorites' },
    { icon: Car, label: 'My Vehicles', path: '/driver/vehicles' },
    { icon: Bell, label: 'Notifications', path: '/driver/notifications' },
    { icon: MessageSquare, label: 'My Reviews', path: '/driver/reviews' },
  ];

  const bottomItems = [
    { icon: User, label: 'Profile', path: '/driver/profile' },
    { icon: Settings, label: 'Settings', path: '/driver/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/driver/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">MP</div>
            <span>MY_PARKING</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200 mx-4 my-4 rounded-lg bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {user?.name?.[0]}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-600">{user?.city}</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="border-t border-gray-200 px-4 py-6 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-error hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DriverSidebar;
