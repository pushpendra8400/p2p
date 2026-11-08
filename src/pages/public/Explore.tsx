import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter, Grid3x3, List, X } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoParkingSpaces } from '../../data/demo';
import ParkingCard from '../../components/cards/ParkingCard';
import { useAppStore } from '../../store';

const Explore: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { searchFilters, setSearchFilters } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);

  const initialQuery = searchParams.get('query') || '';
  const initialCity = searchParams.get('city') || 'Mumbai';

  const filtered = useMemo(() => {
    return demoParkingSpaces.filter((parking) => {
      const matchesQuery = !initialQuery ||
        parking.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
        parking.locality.toLowerCase().includes(initialQuery.toLowerCase());

      const matchesCity = !initialCity ||
        parking.city.toLowerCase().includes(initialCity.toLowerCase());

      const matchesType = searchFilters.type === 'all' || parking.type === searchFilters.type;
      const matchesPrice = parking.pricePerHour >= searchFilters.priceRange[0] &&
        parking.pricePerHour <= searchFilters.priceRange[1];
      const matchesRating = parking.rating >= searchFilters.rating;
      const matchesEV = !searchFilters.evCharging || parking.evCharging;
      const matchesSecurity = !searchFilters.security || parking.security.includes('Security Guards');

      return (
        matchesQuery &&
        matchesCity &&
        matchesType &&
        matchesPrice &&
        matchesRating &&
        matchesEV &&
        matchesSecurity
      );
    }).sort((a, b) => {
      if (searchFilters.sortBy === 'price') return a.pricePerHour - b.pricePerHour;
      if (searchFilters.sortBy === 'rating') return b.rating - a.rating;
      if (searchFilters.sortBy === 'distance') return (a.distance || 0) - (b.distance || 0);
      return 0;
    });
  }, [initialQuery, initialCity, searchFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow p-4 space-y-4">
            <div className="flex gap-2 md:gap-4">
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parking spaces..."
                  defaultValue={initialQuery}
                  onChange={(e) => setSearchFilters({ query: e.target.value })}
                  className="bg-transparent flex-1 outline-none"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Filter size={20} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={searchFilters.type}
                      onChange={(e) => setSearchFilters({ type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="all">All Types</option>
                      <option value="covered">Covered</option>
                      <option value="open">Open</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Price/Hour</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={searchFilters.priceRange[1]}
                      onChange={(e) => setSearchFilters({
                        priceRange: [searchFilters.priceRange[0], Number(e.target.value)]
                      })}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600 mt-1">₹0 - ₹{searchFilters.priceRange[1]}</p>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Rating</label>
                    <select
                      value={searchFilters.rating}
                      onChange={(e) => setSearchFilters({ rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="0">All Ratings</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                    </select>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={searchFilters.evCharging}
                        onChange={(e) => setSearchFilters({ evCharging: e.target.checked })}
                      />
                      <span className="text-sm font-medium">EV Charging</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={searchFilters.security}
                        onChange={(e) => setSearchFilters({ security: e.target.checked })}
                      />
                      <span className="text-sm font-medium">Security Guard</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSearchFilters({
                      query: '',
                      type: 'all',
                      priceRange: [0, 200],
                      rating: 0,
                      evCharging: false,
                      security: false
                    });
                  }}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {filtered.length} Parking Spaces Found
            </h2>

            <select
              value={searchFilters.sortBy}
              onChange={(e) => setSearchFilters({ sortBy: e.target.value as any })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="distance">Nearest First</option>
              <option value="price">Cheapest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((parking) => (
                <ParkingCard key={parking.id} parking={parking} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No parking spaces found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
