import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoParkingSpaces } from '../../data/demo';
import ParkingCard from '../../components/cards/ParkingCard';
import { Heart } from 'lucide-react';

const DriverFavorites: React.FC = () => {
  const favorites = ['p1', 'p4', 'p8'];
  const favoriteParking = demoParkingSpaces.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Saved Parking</h1>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {favoriteParking.length} saved
          </span>
        </div>

        {favoriteParking.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteParking.map((parking) => (
              <ParkingCard key={parking.id} parking={parking} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No favorites yet</h3>
            <p className="text-gray-600 mt-2">Start exploring and save parking spaces you like!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DriverFavorites;