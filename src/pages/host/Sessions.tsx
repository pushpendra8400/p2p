import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Check, MapPin, Clock, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store';

const HostSessions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'waiting' | 'active' | 'completed'>('waiting');
  const hostSessions = useAppStore((state) => state.hostSessions);
  const verifyArrival = useAppStore((state) => state.verifyArrival);

  const filteredSessions = hostSessions.filter((s) => s.status === activeTab);

  const getStatusBadge = (status: string) => {
    const styles = {
      waiting: 'bg-yellow-100 text-yellow-700',
      active: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Parking Sessions</h1>
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {hostSessions.length} active
            </span>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            {['waiting', 'active', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      session.status === 'waiting' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {session.status === 'active' ? <Check size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{session.parkingName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadge(session.status)}`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">
                        Driver: <span className="font-medium">{session.driverName}</span>
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span>{session.vehicleName} - {session.vehiclePlate}</span>
                        <span className="text-gray-400">|</span>
                        <span className="font-mono">OTP: {session.arrivalOtp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">₹{session.amount}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(session.checkIn).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(session.checkIn).toLocaleTimeString()} - {new Date(session.checkOut).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {session.status === 'waiting' && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end">
                    <button
                      onClick={() => verifyArrival(session.id)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <Check size={18} />
                      Verify Arrival
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostSessions;