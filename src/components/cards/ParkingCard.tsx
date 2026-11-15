import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Zap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParkingSpace } from '../../types';
import { useAppStore } from '../../store';

interface ParkingCardProps {
  parking: ParkingSpace;
  onFavoriteClick?: () => void;
  index?: number;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ parking, onFavoriteClick, index = 0 }) => {
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(parking.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(parking.id);
    onFavoriteClick?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some', margin: '-80px' }}
      transition={{
        duration: 0.3,
        delay: index ? index * 0.06 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={`/parking/${parking.id}`}
        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-card-hover transition-shadow duration-300 block h-full"
      >
        {/* Image Container with Animations */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <motion.img
            src={parking.images[0]}
            alt={parking.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-0 flex items-start justify-between p-3"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                parking.type === 'covered' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
              }`}
              initial={{ opacity: 0, y: -10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {parking.type === 'covered' ? '🏠 Covered' : '☀️ Open'}
            </motion.span>

            <motion.button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.2 }}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </motion.button>
          </motion.div>

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
            <motion.div
              className="flex items-center gap-1 ml-2"
              whileHover={{ scale: 1.05 }}
            >
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-sm">{parking.rating}</span>
              <span className="text-xs text-gray-500">({parking.reviewCount})</span>
            </motion.div>
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
              <motion.span
                className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                whileHover={{ scale: 1.05 }}
              >
                <Zap size={12} />
                EV
              </motion.span>
            )}
            {parking.security.includes('Security Guards') && (
              <motion.span
                className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                whileHover={{ scale: 1.05 }}
              >
                <Lock size={12} />
                Secure
              </motion.span>
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
    </motion.div>
  );
};

export default ParkingCard;
