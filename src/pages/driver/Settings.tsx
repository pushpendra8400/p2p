import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Lock, Bell, CreditCard, Palette, Shield, Download, Trash2, Eye, EyeOff, Check } from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Reveal } from '../../motion';
import { cn } from '../../lib/utils';

type SettingSection = 'account' | 'security' | 'notifications' | 'payments' | 'preferences' | 'privacy';

interface NotificationSettings {
  bookingUpdates: boolean;
  reminders: boolean;
  offers: boolean;
  emailNotif: boolean;
  smsNotif: boolean;
  pushNotif: boolean;
}

interface PreferencesSettings {
  language: string;
  currency: string;
  distanceUnit: 'km' | 'mi';
  theme: 'light' | 'dark';
}

const Settings: React.FC = () => {
  const { user, updateProfile, logout } = useAppStore();
  const [activeSection, setActiveSection] = useState<SettingSection>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Account state
  const [accountData, setAccountData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    bookingUpdates: true,
    reminders: true,
    offers: false,
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
  });

  // Preferences state
  const [preferences, setPreferences] = useState<PreferencesSettings>({
    language: 'en',
    currency: 'INR',
    distanceUnit: 'km',
    theme: 'light',
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSaveAccount = () => {
    updateProfile(accountData);
    showToast('Account updated successfully', 'success');
  };

  const handleSaveNotifications = () => {
    showToast('Notification preferences saved', 'success');
  };

  const handleChangePassword = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    showToast('Password changed successfully', 'success');
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== 'DELETE MY ACCOUNT') {
      showToast('Please type the confirmation text', 'error');
      return;
    }
    logout();
    showToast('Account deleted', 'success');
  };

  const handleDownloadData = () => {
    const data = {
      user: { ...user, ...accountData },
      preferences,
      notifications,
      exportedAt: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-parking-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Data downloaded successfully', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const sections: { id: SettingSection; label: string; icon: React.ReactNode }[] = [
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 py-6">
      {/* Sidebar */}
      <div className="lg:w-48 flex-shrink-0">
        <Reveal>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Settings</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{section.icon}</span>
                  {section.label}
                </motion.button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Reveal>
          {activeSection === 'account' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h2>
                <p className="text-gray-600">Update your personal information</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={accountData.name}
                  onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                />
                <Input
                  label="Phone"
                  value={accountData.phone}
                  onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                />
                <Input
                  label="City"
                  value={accountData.city}
                  onChange={(e) => setAccountData({ ...accountData, city: e.target.value })}
                />
              </div>

              <Button onClick={handleSaveAccount}>Save Changes</Button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Security</h2>
                <p className="text-gray-600">Manage your password and security settings</p>
              </div>

              <div className="space-y-6 border-t border-gray-200 pt-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        label="Current Password"
                        type={showPassword ? 'text' : 'password'}
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      />
                    </div>
                    <Input
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    />
                    <Input
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm text-gray-700">Show passwords</span>
                    </label>
                  </div>
                  <Button onClick={handleChangePassword} className="mt-4">
                    Update Password
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Active Sessions</h3>
                  <p className="text-sm text-gray-600 mb-4">1 active session (This device)</p>
                  <Button variant="outline">Logout All Devices</Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h2>
                <p className="text-gray-600">Control what notifications you receive</p>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">Booking Updates</p>
                    <p className="text-sm text-gray-600">Get updates on your bookings</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.bookingUpdates}
                    onChange={(e) => setNotifications({ ...notifications, bookingUpdates: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">Reminders</p>
                    <p className="text-sm text-gray-600">Parking reminders and alerts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.reminders}
                    onChange={(e) => setNotifications({ ...notifications, reminders: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">Promotional Offers</p>
                    <p className="text-sm text-gray-600">Special deals and discounts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.offers}
                    onChange={(e) => setNotifications({ ...notifications, offers: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-900 mb-3">Notification Channels</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notifications.emailNotif}
                        onChange={(e) => setNotifications({ ...notifications, emailNotif: e.target.checked })}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notifications.smsNotif}
                        onChange={(e) => setNotifications({ ...notifications, smsNotif: e.target.checked })}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm text-gray-700">SMS</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notifications.pushNotif}
                        onChange={(e) => setNotifications({ ...notifications, pushNotif: e.target.checked })}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm text-gray-700">Push Notifications</span>
                    </label>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Methods</h2>
                <p className="text-gray-600">Manage your saved payment methods</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">💳 ***...1234</p>
                    <p className="text-sm text-gray-600">Visa Credit Card</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">Default</span>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">🏦 UPI: user...@okhdfcbank</p>
                    <p className="text-sm text-gray-600">UPI Payment</p>
                  </div>
                  <button className="text-error text-sm font-medium hover:underline">Remove</button>
                </div>
              </div>

              <Button variant="outline">Add New Payment Method</Button>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Preferences</h2>
                <p className="text-gray-600">Customize your app experience</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2">Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2">Currency</label>
                  <select
                    value={preferences.currency}
                    onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="INR">₹ Indian Rupee</option>
                    <option value="USD">$ US Dollar</option>
                    <option value="EUR">€ Euro</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 block mb-2">Distance Unit</label>
                  <div className="flex gap-3">
                    {['km', 'mi'].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setPreferences({ ...preferences, distanceUnit: unit as 'km' | 'mi' })}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-lg border-2 font-medium transition-colors',
                          preferences.distanceUnit === unit
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        )}
                      >
                        {unit.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={() => showToast('Preferences saved', 'success')}>Save Preferences</Button>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Privacy & Data</h2>
                <p className="text-gray-600">Manage your data and account</p>
              </div>

              <div className="space-y-6 border-t border-gray-200 pt-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Download Your Data</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Download all your personal data in JSON format
                  </p>
                  <Button onClick={handleDownloadData} variant="outline">
                    <Download size={18} className="mr-2" /> Download Data
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-3">Delete Account</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                    <Trash2 size={18} className="mr-2" /> Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          className={cn(
            'fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white text-sm font-medium shadow-lg',
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {toast.message}
        </motion.div>
      )}

      {/* Delete Account Modal */}
      <Modal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Delete Account"
        size="md"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={deleteConfirm !== 'DELETE MY ACCOUNT'}
              onClick={handleDeleteAccount}
            >
              Delete Permanently
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This action will permanently delete your account and all associated data. This cannot be undone.
          </p>
          <p className="text-sm text-gray-600">
            Type <code className="bg-gray-100 px-2 py-1 rounded">DELETE MY ACCOUNT</code> to confirm:
          </p>
          <input
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="DELETE MY ACCOUNT"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
