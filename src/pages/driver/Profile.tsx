import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Star, BookOpen, Heart, Car, Settings, LogOut, Bell, MessageSquare } from 'lucide-react';
import { useAppStore } from '../../store';

const DriverProfile: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const [editing, setEditing] = useState(false);

  const profileMenu = [
    { icon: BookOpen, label: 'My Bookings', path: '/driver/bookings' },
    { icon: Heart, label: 'Favorites', path: '/driver/favorites' },
    { icon: Car, label: 'My Vehicles', path: '/driver/vehicles' },
    { icon: MessageSquare, label: 'My Reviews', path: '/driver/reviews' },
    { icon: Bell, label: 'Notifications', path: '/driver/notifications' },
    { icon: Settings, label: 'Settings', path: '/driver/settings' },
  ];

  return (
    <div className="space-y-6">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {user?.name?.[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <Phone size={16} />
              {user?.phone}
            </p>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <MapPin size={16} />
              {user?.city}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Member since {new Date(user?.memberSince || '').toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-primary">{user?.totalBookings}</p>
            <p className="text-sm text-gray-600 mt-1">Total Bookings</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-primary">5</p>
            <p className="text-sm text-gray-600 mt-1">Favorites</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-primary">{user?.rating}</p>
            <p className="text-sm text-gray-600 mt-1">Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-primary">{(user?.totalBookings || 0) - 5}</p>
            <p className="text-sm text-gray-600 mt-1">Completed</p>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold">Account Settings</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {profileMenu.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <item.icon size={20} className="text-gray-600" />
                </div>
                <span className="font-medium">{item.label}</span>
                <div className="ml-auto">
                  <span className="text-gray-400 text-sm">{item.path.split('/').pop()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="flex items-center gap-2 px-6 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;