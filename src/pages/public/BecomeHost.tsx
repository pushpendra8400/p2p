import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Users, Zap, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BecomeHost: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Turn Your Parking Into Income</h1>
          <p className="text-xl text-white text-opacity-90">
            List your unused parking space and earn ₹15,000 - ₹50,000+ per month
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
          >
            Get Started Today <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Why Become a Host */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Become a Host?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Passive Income',
                description: 'Earn money from your unused parking space with minimal effort.',
              },
              {
                icon: Shield,
                title: 'Secure Platform',
                description: 'All transactions are secure and insured. We handle payment and support.',
              },
              {
                icon: Users,
                title: 'Easy Management',
                description: 'Simple dashboard to manage bookings, payments, and availability.',
              },
              {
                icon: Zap,
                title: 'Quick Setup',
                description: 'List your space in minutes with photos and pricing.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 bg-gray-50 rounded-2xl space-y-4">
                  <Icon size={40} className="text-primary" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'List Your Space',
                description: 'Create a listing with photos, location, pricing, and amenities.',
              },
              {
                step: 2,
                title: 'Manage Bookings',
                description: 'Accept bookings and manage your parking sessions from the dashboard.',
              },
              {
                step: 3,
                title: 'Earn Money',
                description: 'Get paid instantly for each booking. Earnings transfer to your account.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Example */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Earnings Example</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { price: 50, hours: 8, earnings: 12000, title: 'Budget Space' },
              { price: 75, hours: 10, earnings: 22500, title: 'Standard Space' },
              { price: 100, hours: 12, earnings: 36000, title: 'Premium Space' },
            ].map((example, idx) => (
              <div key={idx} className="bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-8 space-y-4">
                <h3 className="text-xl font-bold">{example.title}</h3>
                <div className="space-y-2">
                  <p className="text-sm text-white text-opacity-90">
                    ₹{example.price}/hour × {example.hours} hours/day
                  </p>
                  <p className="text-3xl font-bold">₹{example.earnings.toLocaleString()}/month</p>
                  <p className="text-sm text-white text-opacity-75">Average earnings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'What documents do I need?',
                a: 'You need a valid ID, address proof, and parking space proof of ownership or authorization.',
              },
              {
                q: 'How do I get paid?',
                a: 'Earnings are transferred to your bank account within 2-3 working days of each booking.',
              },
              {
                q: 'Can I set my own prices?',
                a: 'Yes! You have complete control over pricing, availability, and booking policies.',
              },
              {
                q: 'What if there are disputes?',
                a: 'Our support team handles all disputes and ensures fair resolution for both parties.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-12">
          <h2 className="text-4xl font-bold">Ready to Start Earning?</h2>
          <p className="text-lg text-white text-opacity-90">
            Join thousands of hosts making passive income with MY_PARKING
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
          >
            Become a Host <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeHost;
