import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Navigation, ArrowRight, Car } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BookingDirections: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary hover:underline">
              <ArrowRight size={20} className="rotate-180" />
              Back
            </button>
            <span className="text-gray-600">/ Directions</span>
          </div>

          <h2 className="text-2xl font-bold mb-6">How to Reach Your Parking Spot</h2>

          {/* Route Summary */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-xl p-6 mb-6 space-y-4">
            <div>
              <p className="text-white text-opacity-80 text-sm mb-1">Destination</p>
              <div className="flex items-center gap-3">
                <MapPin size={24} />
                <h3 className="text-xl font-bold">Phoenix Mall Premium Parking</h3>
              </div>
              <p className="mt-1 text-white text-opacity-90">Lower Parel, Mumbai</p>
            </div>
            <div className="flex items-center gap-2">
              <Navigation size={20} />
              <span className="text-sm">1.2 km • ~5 min drive</span>
            </div>
          </div>

          {/* Step-by-Step Directions */}
          <div className="space-y-6 mb-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="w-0.5 h-full bg-gray-300 my-2"></div>
              </div>
              <div>
                <p className="font-semibold">Start from your current location</p>
                <p className="text-sm text-gray-600">Head towards Lower Parel</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="w-0.5 h-full bg-gray-300 my-2"></div>
              </div>
              <div>
                <p className="font-semibold">Take the first right at the traffic signal</p>
                <p className="text-sm text-gray-600">Towards Phoenix Mall entrance</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <div>
                <p className="font-semibold">Enter the parking garage</p>
                <p className="text-sm text-gray-600">Follow signs to Level B2</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center gap-2">
              <Navigation size={20} />
              Open in Google Maps
            </button>
            <button
              onClick={() => navigate(`/checkout/booking/${id}/arrival`)}
              className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              I'm Arriving Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingDirections;