import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoBookings, demoParkingSpaces } from '../../data/demo';

const HostBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed' | 'cancelled'>('upcoming');
  const parkingSpaces = demoParkingSpaces;

  // Get bookings for host's parking spaces
  const hostParkingIds = ['p1', 'p4', 'p6'];
  const hostBookings = demoBookings.filter((b) => hostParkingIds.includes(b.parkingId));
  const filteredBookings = hostBookings.filter((b) => b.status === activeTab);

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-700',
      active: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Bookings</h1>
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {hostBookings.length} bookings
            </span>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            {['upcoming', 'active', 'completed', 'cancelled'].map((tab) => (
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

          {/* Bookings List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="p-6 border-b border-gray-200 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <img
                        src={booking.parkingImage}
                        alt={booking.parkingName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{booking.parkingName}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <span className="font-mono text-sm">BK-{booking.id}</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">#{booking.id}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {new Date(booking.checkIn).toLocaleDateString()} at {new Date(booking.checkIn).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <p className="font-bold text-lg text-primary mt-2">₹{booking.totalAmount}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-600">
                No bookings found in this category
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostBookings;