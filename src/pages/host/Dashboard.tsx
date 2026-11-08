import React from 'react';
import { useAppStore } from '../../store';
import { TrendingUp, DollarSign, MapPin, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { earningsChartData } from '../../data/demo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HostDashboard: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const hostSessions = useAppStore((state) => state.hostSessions);

  const activeSessions = hostSessions.filter((s) => s.status === 'active' || s.status === 'waiting');
  const completedSessions = hostSessions.filter((s) => s.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <DollarSign size={20} />
              </div>
              <span className="text-sm text-gray-600">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{(user?.totalBookings || 0) * 500}</p>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <ArrowUpRight size={16} />
              <span>12% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Clock size={20} />
              </div>
              <span className="text-sm text-gray-600">Active Sessions</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeSessions.length}</p>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <span>5 waiting for verification</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <MapPin size={20} />
              </div>
              <span className="text-sm text-gray-600">Parking Spaces</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <span>92% occupancy rate</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                <TrendingUp size={20} />
              </div>
              <span className="text-sm text-gray-600">Reviews</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <span>24 total ratings</span>
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold mb-6">Earnings Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                  itemStyle={{ color: '#3157f6' }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#3157f6"
                  strokeWidth={2}
                  dot={{ fill: '#3157f6', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {hostSessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    session.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    <span className="font-bold text-sm">BK</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{session.driverName}</p>
                    <p className="text-xs text-gray-600">{session.vehicleName} - {session.vehiclePlate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">₹{session.amount}</p>
                  <p className="text-xs text-gray-600">{new Date(session.checkIn).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;