import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ParkingCard from '../../components/cards/ParkingCard';
import { demoParkingSpaces } from '../../data/demo';

const HostParking: React.FC = () => {
  const myParking = demoParkingSpaces.filter((p) => ['p1', 'p4', 'p6'].includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Parking Spaces</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your listed parking spots</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold">
            + Add New Space
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myParking.map((parking) => (
            <ParkingCard key={parking.id} parking={parking} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostParking;