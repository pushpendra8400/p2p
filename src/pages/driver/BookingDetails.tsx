import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoBookings } from '../../data/demo';

const BookingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = demoBookings.find((b) => b.id === id);

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-700',
      active: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles];
  };

  if (!booking) {
    return <div className="p-8">Booking not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ChevronLeft size={20} />
          Back to Bookings
        </button>

        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <img
                src={booking.parkingImage}
                alt={booking.parkingName}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{booking.parkingName}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin size={16} />
                  {booking.parkingAddress}
                </div>
                <p className="text-sm text-gray-500 mt-1">Booking ID: {booking.id}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusBadge(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">
                  {new Date(booking.checkIn).toLocaleTimeString()} - {new Date(booking.checkOut).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{booking.duration} hours</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-medium">{booking.vehicleName} - {booking.vehiclePlate}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid</span>
                <span className="text-2xl font-bold text-primary">₹{booking.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Base: ₹{booking.amount}</span>
                <span>Taxes: ₹{booking.taxes}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center gap-2">
              <MapPin size={20} />
              Get Directions
            </button>
            <button className="flex-1 bg-white border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
              <Phone size={20} />
              Contact
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingDetails;