import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Star, LogOut, Settings } from 'lucide-react';
import { useAppStore } from '../../store';

const HostProfile: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);

  const profileMenu = [
    { icon: Settings, label: 'Settings', path: '/host/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Host Profile</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-6">
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
              <p className="text-gray-600 mt-2">
                Host since {new Date(user?.memberSince || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-primary">{user?.totalBookings || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Total Bookings</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-primary">{user?.rating}</p>
            <p className="text-sm text-gray-600 mt-1">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <p className="text-3xl font-bold text-primary">₹245k</p>
            <p className="text-sm text-gray-600 mt-1">Total Earnings</p>
          </div>
        </div>

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
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
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

export default HostProfile;