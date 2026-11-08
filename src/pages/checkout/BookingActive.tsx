import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Phone } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BookingActive: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [extended, setExtended] = useState(false);

  const checkInTime = new Date();
  const expectedCheckOut = new Date(checkInTime.getTime() + 4 * 60 * 60 * 1000);
  const remainingTime = expectedCheckOut.getTime() - checkInTime.getTime();
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Clock size={32} />
            </div>
            <h2 className="text-2xl font-bold">Parking Active!</h2>
            <p className="text-gray-600">Your parking session has started</p>
          </div>

          {/* Timer */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Time Remaining</p>
            <div className="flex justify-center items-baseline gap-1">
              <span className="text-6xl font-bold text-gray-900">{hours}</span>
              <span className="text-2xl text-gray-600">:</span>
              <span className="text-6xl font-bold text-gray-900">{minutes}</span>
            </div>
            <p className="text-sm text-gray-500">until checkout</p>
          </div>

          {/* Parking Info */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Parking Details</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span>Phoenix Mall Premium Parking</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-mono">BK-{id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span>₹1,234</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold">
              Check Out Now
            </button>

            <button className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Extend Parking (+2 hours)
            </button>

            {extended && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold">Parking extended by 2 hours!</p>
                <p className="text-sm text-green-600 mt-1">Additional charge: ₹160</p>
              </div>
            )}
          </div>

          <button className="w-full flex items-center justify-center gap-2 text-primary hover:underline font-medium">
            <Phone size={18} />
            Contact Security
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingActive;