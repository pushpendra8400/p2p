import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ArrowRight, Shield, Zap, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoParkingSpaces, testimonials, faqData, popularLocations } from '../../data/demo';
import ParkingCard from '../../components/cards/ParkingCard';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchDate, setSearchDate] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const featuredParking = demoParkingSpaces.filter((p) => p.isFeatured).slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to explore with search params
    window.location.href = `/explore?query=${searchQuery}&city=${selectedCity}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Your Perfect Parking Spot.<br />
                  <span className="text-gray-900">Just a Click Away.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover convenient, secure, and affordable parking spaces wherever you go. Book instantly, pay seamlessly, and park with confidence.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                    <MapPin size={20} className="text-primary" />
                    <input
                      type="text"
                      placeholder="Search parking or location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent flex-1 outline-none text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                    <Calendar size={20} className="text-primary" />
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="bg-transparent flex-1 outline-none text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Search size={20} />
                  Find Parking
                </button>
              </form>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-gray-600">Parking Spaces</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">100K+</p>
                  <p className="text-sm text-gray-600">Happy Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">500K+</p>
                  <p className="text-sm text-gray-600">Bookings</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 lg:h-full animate-slide-in-right">
              <img
                src={demoParkingSpaces[0].images[0]}
                alt="Premium Parking"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.8 Rating</span>
                </div>
                <p className="text-sm text-gray-600">Trusted by over 100,000 drivers and hosts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularLocations.map((location, idx) => (
              <Link
                key={idx}
                to={`/explore?city=${location.name}`}
                className="group relative h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{location.name}</h3>
                    <p className="text-sm text-gray-200">{location.count} parking spaces</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Parking */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Parking Spaces</h2>
            <Link to="/explore" className="text-primary hover:text-primary-dark transition-colors font-semibold flex items-center gap-2">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredParking.map((parking) => (
              <ParkingCard key={parking.id} parking={parking} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Find Parking',
                description: 'Search for parking spaces near your destination. Filter by price, amenities, and ratings.'
              },
              {
                icon: CheckCircle,
                title: 'Book & Pay',
                description: 'Select your parking spot, choose dates and times, and complete payment securely.'
              },
              {
                icon: MapPin,
                title: 'Park & Go',
                description: 'Get directions to your parking space and park with complete peace of mind.'
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {idx + 1}
                  </div>
                  <Icon size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose MY_PARKING</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Safe & Secure', desc: '24/7 surveillance and verified hosts' },
              { icon: Zap, title: 'Quick Booking', desc: 'Book in seconds with instant confirmation' },
              { icon: TrendingUp, title: 'Best Prices', desc: 'Affordable rates with no hidden charges' },
              { icon: Users, title: '24/7 Support', desc: 'Round-the-clock customer assistance' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">&quot;{testimonial.comment}&quot;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Host CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Turn Your Parking Space Into Income</h2>
          <p className="text-lg text-white text-opacity-90 mb-8">
            List your parking space and start earning passive income. Hosts earn ₹15,000 - ₹50,000+ per month.
          </p>
          <Link
            to="/host"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Become a Host Today <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full text-left bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                  <ArrowRight
                    size={24}
                    className={`text-primary transition-transform ${expandedFaq === idx ? 'rotate-90' : ''}`}
                  />
                </div>
                {expandedFaq === idx && (
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
