import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAppStore } from '../../store';

const HostSettings: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    updateProfile({ name, email, phone });
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              {['Booking notifications', 'Payment updates', 'Weekly reports'].map((notif) => (
                <label key={notif} className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-primary" />
                  <span className="text-gray-700">{notif}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostSettings;