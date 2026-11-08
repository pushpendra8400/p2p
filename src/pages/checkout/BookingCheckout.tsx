import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, CreditCard, Wallet, Car } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoParkingSpaces, demoVehicles } from '../../data/demo';
import { useAppStore } from '../../store';

const BookingCheckout: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parking = demoParkingSpaces.find((p) => p.id === id);
  
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [coupon, setCoupon] = useState('');

  const vehicles = useAppStore((state) => state.vehicles);

  const calculateDuration = () => {
    if (!checkInDate || !checkInTime || !checkOutDate || !checkOutTime) return 0;
    
    const checkIn = new Date(`${checkInDate}T${checkInTime}`);
    const checkOut = new Date(`${checkOutDate}T${checkOutTime}`);
    
    const diffHours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
    return Math.max(1, Math.ceil(diffHours));
  };

  const duration = useMemo(() => calculateDuration(), [checkInDate, checkInTime, checkOutDate, checkOutTime]);
  const amount = parking ? duration * parking.pricePerHour : 0;
  const taxes = Math.round(amount * 0.18);
  const totalAmount = amount + taxes;
  const savings = parking ? parking.pricePerHour * duration * 0.1 : 0;

  if (!parking) {
    return <div>Parking not found</div>;
  }

  const handleContinue = () => {
    navigate(`/checkout/parking/${parking.id}/step2`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary hover:underline">
            <ChevronLeft size={20} />
            Back
          </button>
          <span className="text-gray-600">/ Booking Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Parking Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex gap-4">
                <img
                  src={parking.images[0]}
                  alt={parking.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{parking.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-primary font-bold">{parking.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span>{parking.locality}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{parking.address}</p>
                </div>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
              <h3 className="text-lg font-bold">Select Dates & Times</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Check In</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <input
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check Out</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                    />
                    <input
                      type="time"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {duration > 0 && (
                <div className="bg-primary bg-opacity-5 border border-primary border-opacity-10 rounded-lg p-3 text-center">
                  <p className="text-primary font-bold">
                    {duration} hour{duration > 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </div>

            {/* Vehicle Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Select Vehicle</h3>
              
              {vehicles.length > 0 ? (
                <div className="space-y-3">
                  {vehicles.map((vehicle) => (
                    <label
                      key={vehicle.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedVehicle === vehicle.id
                          ? 'border-primary bg-primary bg-opacity-5'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="vehicle"
                        value={vehicle.id}
                        checked={selectedVehicle === vehicle.id}
                        onChange={() => setSelectedVehicle(vehicle.id)}
                        className="w-4 h-4 text-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{vehicle.name}</p>
                        <p className="text-sm text-gray-600">{vehicle.licensePlate}</p>
                      </div>
                      <Car size={20} className="text-gray-400" />
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">Add vehicles in My Vehicles to book parking</p>
              )}

              <button
                onClick={() => navigate('/driver/vehicles')}
                className="mt-4 text-primary font-medium hover:underline"
              >
                + Add New Vehicle
              </button>
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Have a coupon?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">
                  Apply
                </button>
              </div>
              {savings > 0 && coupon === '' && (
                <p className="text-success text-sm mt-2">
                  You're saving ₹{savings.toFixed(0)} compared to regular pricing!
                </p>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-6">
              <h3 className="text-lg font-bold mb-6">Booking Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{duration} hour{duration > 1 ? 's' : ''}</span>
                  <span className="font-medium">₹{amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Tax (18%)</span>
                  <span className="font-medium">₹{taxes}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span className="text-gray-600">Discount</span>
                    <span>₹{savings.toFixed(0)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={duration === 0 || (vehicles.length > 0 && !selectedVehicle)}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                Continue to Payment
              </button>

              <p className="text-xs text-gray-500 text-center">
                ✓ Instant confirmation<br />
                ✓ 24/7 support<br />
                ✓ Secure payment
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingCheckout;