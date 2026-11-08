import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoParkingSpaces } from '../../data/demo';

const HostMap: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Parking Map</h1>

        <div className="bg-gray-200 rounded-xl overflow-hidden relative h-[500px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded-lg shadow text-lg font-bold flex items-center justify-center">+</button>
            <button className="w-10 h-10 bg-white rounded-lg shadow text-lg font-bold flex items-center justify-center">-</button>
          </div>

          {/* Map Markers */}
          {demoParkingSpaces.slice(0, 8).map((parking, idx) => (
            <div
              key={idx}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + (idx * 10)}%`,
                top: `${30 + (idx * 8)}%`
              }}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-10 relative group-hover:scale-125 transition-transform">
                ₹{parking.pricePerHour}
              </div>
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping"></div>

              {/* Marker Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-white rounded-lg shadow-lg p-3 z-20">
                <p className="font-semibold text-sm">{parking.name}</p>
                <p className="text-xs text-gray-600">{parking.locality}</p>
                <p className="text-xs text-primary font-bold mt-1">₹{parking.pricePerHour}/hr</p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg text-xs text-gray-600">
            Interactive Map Demo (Simulated)
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostMap;