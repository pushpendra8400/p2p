import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, MapPin, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store';

const DriverBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'active' | 'completed' | 'cancelled'>('upcoming');
  const bookings = useAppStore((state) => state.bookings);

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

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
    <div className="space-y-6">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Bookings List */}
      <div className="px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Link
              key={booking.id}
              to={`/driver/bookings/${booking.id}`}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <img
                  src={booking.parkingImage}
                  alt={booking.parkingName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{booking.parkingName}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <MapPin size={16} />
                        {booking.parkingAddress}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-medium">
                        {new Date(booking.checkIn).toLocaleTimeString()} - {new Date(booking.checkOut).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Vehicle</p>
                      <p className="font-medium">{booking.vehicleName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-bold text-primary">₹{booking.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No bookings found</h3>
            <p className="text-gray-600 mt-2">You haven't made any bookings in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverBookings;
