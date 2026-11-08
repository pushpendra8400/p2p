import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Zap, Lock, Users, ChevronLeft, Heart, Share2, Phone, Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoParkingSpaces, demoReviews } from '../../data/demo';
import { useAppStore } from '../../store';

const ParkingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parking = demoParkingSpaces.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isFavorite = parking && favorites.includes(parking.id);

  if (!parking) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-lg text-gray-600">Parking space not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const reviews = demoReviews.filter((r) => r.parkingId === id);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Image Gallery */}
      <div className="relative h-96 lg:h-[500px] bg-gray-900 overflow-hidden group">
        <img
          src={parking.images[currentImageIndex]}
          alt={parking.name}
          className="w-full h-full object-cover"
        />

        {/* Gallery Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? parking.images.length - 1 : prev - 1))}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === parking.images.length - 1 ? 0 : prev + 1))}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
          >
            →
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {parking.images.length}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-900" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(parking.id)}
              className={`${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-900'} p-2 rounded-full hover:shadow-lg transition-all`}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button className="bg-white text-gray-900 p-2 rounded-full hover:shadow-lg transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{parking.name}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star size={20} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-lg">{parking.rating}</span>
                    <span className="text-gray-600">({parking.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    {parking.locality}, {parking.city}
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full font-semibold text-white ${parking.type === 'covered' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                  {parking.type === 'covered' ? '🏠 Covered' : '☀️ Open'} Parking
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About this space</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{parking.description}</p>
            </div>

            {/* Amenities & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {parking.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Security Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {parking.security.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <Lock size={16} className="text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold">Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Per Hour</p>
                  <p className="text-3xl font-bold text-primary">₹{parking.pricePerHour}</p>
                </div>
                <div className="text-center border-l border-r border-gray-300">
                  <p className="text-gray-600 text-sm mb-1">Per Day</p>
                  <p className="text-3xl font-bold text-primary">₹{parking.pricePerDay}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Per Month</p>
                  <p className="text-3xl font-bold text-primary">₹{parking.pricePerMonth}</p>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Hosted by {parking.hostName}</h3>
              <div className="flex items-start gap-4">
                <img
                  src={parking.hostImage}
                  alt={parking.hostName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{parking.hostName}</span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{parking.hostRating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Hosting since {parking.hostSince}</p>
                  <button className="text-primary font-semibold hover:underline">Contact Host</button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Guest Reviews</h3>
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.userName}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-gray-500 text-sm mt-2">{review.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg space-y-6">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">₹{parking.pricePerHour}</span>
                  <span className="text-gray-600">per hour</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} />
                  <span>{parking.availableSpaces} spaces available</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Check In</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Check Out</label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={() => navigate(`/checkout/parking/${parking.id}/step1`)}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  Book Now
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  Login to Book
                </button>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold mb-3">Questions?</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone size={18} />
                    <span className="text-sm font-medium">Call Support</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Mail size={18} />
                    <span className="text-sm font-medium">Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ParkingDetails;
