import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Zap, Lock } from 'lucide-react';
import { ParkingSpace } from '../../types';
import { useAppStore } from '../../store';

interface ParkingCardProps {
  parking: ParkingSpace;
  onFavoriteClick?: () => void;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ parking, onFavoriteClick }) => {
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(parking.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(parking.id);
    onFavoriteClick?.();
  };

  return (
    <Link
      to={`/parking/${parking.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={parking.images[0]}
          alt={parking.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-start justify-between p-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${parking.type === 'covered' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'}`}>
            {parking.type === 'covered' ? '🏠 Covered' : '☀️ Open'}
          </span>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1 rounded-lg font-semibold text-sm">
          ₹{parking.pricePerHour}/hr
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name & Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 line-clamp-2 flex-1">{parking.name}</h3>
          <div className="flex items-center gap-1 ml-2">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-sm">{parking.rating}</span>
            <span className="text-xs text-gray-500">({parking.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin size={16} />
          <span className="line-clamp-1">{parking.locality}</span>
          {parking.distance && <span className="text-primary font-semibold">{parking.distance} km</span>}
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {parking.evCharging && (
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              <Zap size={12} />
              EV
            </span>
          )}
          {parking.security.includes('Security Guards') && (
            <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              <Lock size={12} />
              Secure
            </span>
          )}
          {parking.availableSpaces > 0 && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
              {parking.availableSpaces} spaces
            </span>
          )}
        </div>

        {/* Pricing Info */}
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
          <div>
            <span className="block font-semibold text-primary">₹{parking.pricePerHour}</span>
            <span className="block text-gray-500">Per Hour</span>
          </div>
          <div>
            <span className="block font-semibold text-primary">₹{parking.pricePerDay}</span>
            <span className="block text-gray-500">Per Day</span>
          </div>
          <div>
            <span className="block font-semibold text-primary">₹{parking.pricePerMonth}</span>
            <span className="block text-gray-500">Per Month</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ParkingCard;
