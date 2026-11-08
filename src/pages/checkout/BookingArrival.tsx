import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BookingArrival: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleGenerateOtp = () => {
    // Generate random 4-digit OTP
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString().split('');
    setOtp(newOtp);
  };

  const handleArrivalConfirm = () => {
    navigate(`/checkout/booking/${id}/active`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary bg-opacity-10 text-primary rounded-full flex items-center justify-center mx-auto">
              <MapPin size={32} />
            </div>
            <h2 className="text-2xl font-bold">I've Arrived!</h2>
            <p className="text-gray-600">Show this OTP to the security guard at the entrance</p>
          </div>

          {/* OTP Display */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-3">
              {otp.map((digit, idx) => (
                <div key={idx} className="w-14 h-16 bg-gray-900 text-white flex items-center justify-center text-2xl font-bold rounded-lg">
                  {digit || '?'}
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerateOtp}
              disabled={otp[0] !== ''}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50"
            >
              Generate OTP
            </button>
          </div>

          {/* Countdown */}
          {otp[0] !== '' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Valid for 15 minutes</p>
                  <p className="text-sm text-green-700">04:32 remaining</p>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="font-semibold">Parking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span>Phoenix Mall Premium Parking</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address</span>
                <span>Lower Parel, Mumbai</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono">BK-{id}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleArrivalConfirm}
            disabled={otp[0] === ''}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Confirm Arrival
          </button>

          <button className="w-full flex items-center justify-center gap-2 text-primary hover:underline font-medium">
            <Phone size={18} />
            Contact Parking Host
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingArrival;