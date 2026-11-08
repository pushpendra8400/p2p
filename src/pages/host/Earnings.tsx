import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { TrendingUp, DollarSign, Calendar, Clock } from 'lucide-react';
import { earningsChartData } from '../../data/demo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HostEarnings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Earnings</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Earnings', value: '₹2,45,600', icon: TrendingUp },
            { label: 'Today\'s Earnings', value: '₹4,280', icon: DollarSign },
            { label: 'Weekly Earnings', value: '₹28,400', icon: Calendar },
            { label: 'Pending Payout', value: '₹12,500', icon: Clock },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center text-primary">
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-bold mb-4">Earnings Overview</h3>
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

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { id: 'TXN001', date: 'Today, 10:30 AM', description: 'Booking BK-2024-002', amount: '₹472', status: 'completed' },
              { id: 'TXN002', date: 'Yesterday', description: 'Booking BK-2024-003', amount: '₹425', status: 'completed' },
              { id: 'TXN003', date: 'Oct 28', description: 'Booking BK-2024-006', amount: '₹1,133', status: 'completed' },
            ].map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₹{tx.amount}</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostEarnings;