import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Star } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BookingCompletion: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold">Parking Completed!</h2>
            <p className="text-gray-600">Hope you had a great experience</p>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-mono">BK-{id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Location</span>
              <span>Phoenix Mall Premium Parking</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-primary pt-2">
              <span>Final Amount</span>
              <span>₹1,234</span>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Rate Your Experience</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-lg transition-colors ${
                    rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <input
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave a review..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/driver/bookings')}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              View All Bookings
            </button>
            <button
              onClick={() => navigate('/driver/dashboard')}
              className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingCompletion;