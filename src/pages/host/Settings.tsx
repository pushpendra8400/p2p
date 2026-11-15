import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Eye, EyeOff, Check } from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Reveal } from '../../motion';
import { cn } from '../../lib/utils';

type SettingSection = 'account' | 'security' | 'notifications' | 'payout' | 'pricing' | 'privacy';

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
}

interface PayoutSettings {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

interface PricingSettings {
  defaultHourlyRate: number;
  defaultDailyRate: number;
  defaultMonthlyRate: number;
}

interface AvailabilitySettings {
  mondayStart: string;
  mondayEnd: string;
  isMonday24h: boolean;
  tuesdayStart: string;
  tuesdayEnd: string;
  isTuesday24h: boolean;
  wednesdayStart: string;
  wednesdayEnd: string;
  isWednesday24h: boolean;
  thursdayStart: string;
  thursdayEnd: string;
  isThursday24h: boolean;
  fridayStart: string;
  fridayEnd: string;
  isFriday24h: boolean;
  saturdayStart: string;
  saturdayEnd: string;
  isSaturday24h: boolean;
  sundayStart: string;
  sundayEnd: string;
  isSunday24h: boolean;
}

const HostSettings: React.FC = () => {
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

  // Payout state
  const [payoutData, setPayoutData] = useState<PayoutSettings>({
    accountHolder: 'Rajesh Kumar',
    bankName: 'HDFC Bank',
    accountNumber: '****7890',
    ifscCode: 'HDFC0001234',
  });

  // Pricing state
  const [pricingData, setPricingData] = useState<PricingSettings>({
    defaultHourlyRate: 80,
    defaultDailyRate: 500,
    defaultMonthlyRate: 8000,
  });

  // Availability state
  const [availabilityData, setAvailabilityData] = useState<AvailabilitySettings>({
    mondayStart: '08:00',
    mondayEnd: '22:00',
    isMonday24h: false,
    tuesdayStart: '08:00',
    tuesdayEnd: '22:00',
    isTuesday24h: false,
    wednesdayStart: '08:00',
    wednesdayEnd: '22:00',
    isWednesday24h: false,
    thursdayStart: '08:00',
    thursdayEnd: '22:00',
    isThursday24h: false,
    fridayStart: '08:00',
    fridayEnd: '22:00',
    isFriday24h: false,
    saturdayStart: '08:00',
    saturdayEnd: '22:00',
    isSaturday24h: false,
    sundayStart: '08:00',
    sundayEnd: '22:00',
    isSunday24h: false,
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [autoAcceptBookings, setAutoAcceptBookings] = useState(false);
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

  const handleSavePayout = () => {
    showToast('Payout account updated successfully', 'success');
  };

  const handleSavePricing = () => {
    showToast('Pricing updated successfully', 'success');
  };

  const handleSaveAvailability = () => {
    showToast('Availability hours updated', 'success');
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
      payout: payoutData,
      pricing: pricingData,
      availability: availabilityData,
      notifications,
      exportedAt: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-parking-host-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Data downloaded successfully', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const sections: { id: SettingSection; label: string; icon: string }[] = [
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'payout', label: 'Payout', icon: '💰' },
    { id: 'pricing', label: 'Pricing', icon: '💳' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
  ];

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const getAvailability = (day: string) => {
    const key = day.toLowerCase() as keyof AvailabilitySettings;
    const startKey = `${key}Start` as keyof AvailabilitySettings;
    const endKey = `${key}End` as keyof AvailabilitySettings;
    const is24hKey = `is${day}24h` as keyof AvailabilitySettings;
    return {
      start: availabilityData[startKey],
      end: availabilityData[endKey],
      is24h: availabilityData[is24hKey],
    };
  };

  const updateAvailability = (day: string, field: 'start' | 'end' | 'is24h', value: any) => {
    const key = day.toLowerCase();
    const dataKey = field === 'start' ? `${key}Start` : field === 'end' ? `${key}End` : `is${day}24h`;
    setAvailabilityData({ ...availabilityData, [dataKey]: value });
  };

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
                    <Input
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    />
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
                    <p className="font-medium text-gray-900">Booking Requests</p>
                    <p className="text-sm text-gray-600">New booking requests</p>
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
                    <p className="text-sm text-gray-600">Booking reminders and alerts</p>
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

          {activeSection === 'payout' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Payout Account</h2>
                <p className="text-gray-600">Manage your bank account for payouts</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Account Holder Name"
                  value={payoutData.accountHolder}
                  onChange={(e) => setPayoutData({ ...payoutData, accountHolder: e.target.value })}
                />
                <Input
                  label="Bank Name"
                  value={payoutData.bankName}
                  onChange={(e) => setPayoutData({ ...payoutData, bankName: e.target.value })}
                />
                <Input
                  label="Account Number"
                  type="password"
                  value={payoutData.accountNumber}
                  onChange={(e) => setPayoutData({ ...payoutData, accountNumber: e.target.value })}
                  hint="Your account number is encrypted and secure"
                />
                <Input
                  label="IFSC Code"
                  value={payoutData.ifscCode}
                  onChange={(e) => setPayoutData({ ...payoutData, ifscCode: e.target.value.toUpperCase() })}
                  placeholder="e.g., HDFC0001234"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  💡 Payouts will be processed to this account every week. Ensure the details are accurate.
                </p>
              </div>

              <Button onClick={handleSavePayout}>Save Payout Account</Button>
            </div>
          )}

          {activeSection === 'pricing' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Pricing</h2>
                <p className="text-gray-600">Set default rates for your parking space</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Default Hourly Rate (₹)"
                  type="number"
                  value={pricingData.defaultHourlyRate}
                  onChange={(e) => setPricingData({ ...pricingData, defaultHourlyRate: Number(e.target.value) })}
                  hint="Price per hour"
                />
                <Input
                  label="Default Daily Rate (₹)"
                  type="number"
                  value={pricingData.defaultDailyRate}
                  onChange={(e) => setPricingData({ ...pricingData, defaultDailyRate: Number(e.target.value) })}
                  hint="Price per day (24 hours)"
                />
                <Input
                  label="Default Monthly Rate (₹)"
                  type="number"
                  value={pricingData.defaultMonthlyRate}
                  onChange={(e) => setPricingData({ ...pricingData, defaultMonthlyRate: Number(e.target.value) })}
                  hint="Price per month (30 days)"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  📌 These are default rates for new listings. You can adjust rates per parking space.
                </p>
              </div>

              <Button onClick={handleSavePricing}>Save Pricing</Button>
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
                    Download all your personal data including account info, payout details, and pricing in JSON format
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

export default HostSettings;
