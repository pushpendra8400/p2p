import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Heart, ArrowRight, BookOpen, TrendingUp, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { demoParkingSpaces, demoBookings } from '../../data/demo';
import ParkingCard from '../../components/cards/ParkingCard';
import { Reveal, Stagger, CountUp } from '../../motion';
import { durations, easing } from '../../motion/tokens';

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
      <motion.div
        className="px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.base, ease: easing }}
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: durations.base, delay: 0.1, ease: easing }}
            >
              Welcome, {user?.name?.split(' ')[0]}
            </motion.h1>
            <motion.p
              className="text-gray-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: durations.base, delay: 0.2, ease: easing }}
            >
              Here's what's happening with your parking
            </motion.p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/driver/notifications"
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors relative"
            >
              <Bell size={20} />
              <motion.span
                className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Active/Upcoming Bookings */}
        {activeBooking && (
          <motion.div
            className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.base, delay: 0.1, ease: easing }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Parking Session</h2>
              <motion.span
                className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Live
              </motion.span>
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={`/checkout/booking/${activeBooking.id}/active`}
                    className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold text-sm transition-colors"
                  >
                    View <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {upcomingBooking && (
          <Reveal delay={0.2}>
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={`/driver/bookings/${upcomingBooking.id}`}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Quick Stats with CountUp */}
        <Stagger staggerDelay={0.1}>
          <motion.div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
            <p className="text-3xl font-bold text-primary">
              <CountUp to={bookings.length} format={(v) => v.toString()} />
            </p>
            <p className="text-xs text-gray-500">All time</p>
          </motion.div>
          <motion.div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Saved Parking</p>
            <p className="text-3xl font-bold text-primary">
              <CountUp to={favorites.length} format={(v) => v.toString()} />
            </p>
            <p className="text-xs text-gray-500">Favorite spaces</p>
          </motion.div>
          <motion.div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Average Rating</p>
            <p className="text-3xl font-bold text-primary">{user?.rating}</p>
            <p className="text-xs text-gray-500">Driver rating</p>
          </motion.div>
          <motion.div className="bg-white rounded-xl p-6 border border-gray-200 space-y-2">
            <p className="text-gray-600 text-sm font-medium">Total Saved</p>
            <p className="text-3xl font-bold text-accent">
              ₹<CountUp to={2450} format={(v) => v.toString()} />
            </p>
            <p className="text-xs text-gray-500">Through discounts</p>
          </motion.div>
        </Stagger>

        {/* Recent Bookings */}
        {recentBookings.length > 0 && (
          <Reveal delay={0.3}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recent Bookings</h2>
                <Link to="/driver/bookings" className="text-primary hover:underline font-semibold flex items-center gap-2">
                  View All <ArrowRight size={18} />
                </Link>
              </div>
              <div className="space-y-3">
                {recentBookings.map((booking, idx) => (
                  <motion.div
                    key={booking.id}
                    className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: durations.base,
                      delay: idx * 0.06,
                      ease: easing,
                    }}
                    whileHover={{ y: -4 }}
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{booking.parkingName}</p>
                      <p className="text-sm text-gray-600">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{booking.totalAmount}</p>
                      <p className="text-sm text-success">Completed</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Recommended Parking */}
        <Reveal delay={0.4}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recommended for You</h2>
              <Link to="/driver/search" className="text-primary hover:underline font-semibold flex items-center gap-2">
                Explore More <ArrowRight size={18} />
              </Link>
            </div>
            <Stagger staggerDelay={0.1}>
              {recommendedParking.map((parking, idx) => (
                <div key={parking.id}>
                  <ParkingCard parking={parking} index={idx} />
                </div>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default DriverDashboard;