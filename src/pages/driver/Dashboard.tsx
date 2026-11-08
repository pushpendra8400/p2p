import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Heart, ArrowRight, BookOpen, TrendingUp, Bell } from 'lucide-react';
import { useAppStore } from '../../store';
import { demoParkingSpaces, demoBookings } from '../../data/demo';
import ParkingCard from '../../components/cards/ParkingCard';

const DriverDashboard: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const bookings = useAppStore((state) => state.bookings);
  const favorites = useAppStore((state) => state.favorites);

  const upcomingBooking = bookings.find((b) => b.status === 'upcoming');
  const activeBooking = bookings.find((b) => b.status === 'active');
  const recentBookings = bookings.filter((b) => b.status === 'completed').slice(0, 3);
  const recommendedParking = demoParkingSpaces.filter((p) => !favorites.includes(p.id)).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name?.split(' ')[0]}</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your parking</p>
          </div>
          <Link
            to="/driver/notifications"
            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Active/Upcoming Bookings */}
        {activeBooking && (
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Parking Session</h2>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">Live</span>
            </div>
            <p className="text-lg text-white text-opacity-90">{activeBooking.parkingName}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-white text-opacity-75 text-sm">Check In</p>
                <p className="font-semibold">{new Date(activeBooking.checkIn).toLocaleTimeString()}</p>
              </div>
              <div>
                <p className="text-white text-opacity-75 text-sm">Remaining</p>
                <p className="font-semibold">2h 45m</p>
              </div>
              <div>
                <p className="text-white text-opacity-75 text-sm">Amount</p>
                <p className="font-semibold">₹{activeBooking.totalAmount}</p>
              </div>
              <div>
                <Link
                  to={`/checkout/booking/${activeBooking.id}/active`}
                  className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold text-sm transition-colors"
                >
                  View <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {upcomingBooking && (
          <div className="border-2 border-primary rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold">Upcoming Booking</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  <MapPin size={16} className="inline mr-1" />
                  {upcomingBooking.parkingName}
                </p>
                <p className="text-lg font-bold mt-2">{new Date(upcomingBooking.checkIn).toLocaleDateString()}</p>
              </div>
              <Link
                to={`/driver/bookings/${upcomingBooking.id}`}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                View Details
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
            <p className="text-3xl font-bold text-primary">{bookings.length}</p>
            <p className="text-xs text-gray-500">All time</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Saved Parking</p>
            <p className="text-3xl font-bold text-primary">{favorites.length}</p>
            <p className="text-xs text-gray-500">Favorite spaces</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Average Rating</p>
            <p className="text-3xl font-bold text-primary">{user?.rating}</p>
            <p className="text-xs text-gray-500">Driver rating</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Total Saved</p>
            <p className="text-3xl font-bold text-accent">₹2,450</p>
            <p className="text-xs text-gray-500">Through discounts</p>
          </div>
        </div>

        {/* Recent Bookings */}
        {recentBookings.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Bookings</h2>
              <Link to="/driver/bookings" className="text-primary hover:underline font-semibold flex items-center gap-2">
                View All <ArrowRight size={18} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-gray-900">{booking.parkingName}</p>
                    <p className="text-sm text-gray-600">{new Date(booking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{booking.totalAmount}</p>
                    <p className="text-sm text-success">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Parking */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <Link to="/driver/search" className="text-primary hover:underline font-semibold flex items-center gap-2">
              Explore More <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedParking.map((parking) => (
              <ParkingCard key={parking.id} parking={parking} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;