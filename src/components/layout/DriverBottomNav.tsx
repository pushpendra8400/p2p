import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Map,
  BookOpen,
  Heart,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const DriverBottomNav: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/driver/dashboard' },
    { icon: Search, label: 'Search', path: '/driver/search' },
    { icon: Map, label: 'Map', path: '/driver/map' },
    { icon: BookOpen, label: 'Bookings', path: '/driver/bookings' },
    { icon: Heart, label: 'Favorites', path: '/driver/favorites' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-0">
      <div className="flex justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-3 px-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-primary'
              )}
            >
              <Icon size={24} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default DriverBottomNav;
