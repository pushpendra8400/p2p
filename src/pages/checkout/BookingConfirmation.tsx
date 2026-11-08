import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Check, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BookingConfirmation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="space-y-8">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <CheckCircle size={48} />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
            <p className="text-gray-600">Your parking has been successfully booked.</p>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-mono font-medium">BK-{id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Parking Space</span>
              <span className="font-medium text-right">Phoenix Mall Premium Parking</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">Today, 2:00 PM</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Vehicle</span>
              <span className="font-medium">Honda City - MH 02 AB 1234</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-primary pt-2">
              <span>Amount Paid</span>
              <span>₹1,234</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/driver/dashboard')}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate(`/checkout/booking/${id}/directions`)}
              className="w-full bg-white border border-primary text-primary py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <ArrowRight size={20} />
              Get Directions
            </button>
          </div>

          {/* QR Code */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 inline-block">
            <div className="w-48 h-48 bg-gray-100 mx-auto rounded-lg flex items-center justify-center mb-2">
              <span className="text-gray-400 text-sm">QR Code</span>
            </div>
            <p className="text-sm text-gray-600">Show this QR code at the parking entrance</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;