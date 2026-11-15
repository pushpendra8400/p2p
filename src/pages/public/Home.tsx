import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ArrowRight, Shield, Zap, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { demoParkingSpaces, testimonials, faqData, popularLocations } from '../../data/demo';
import ParkingCard from '../../components/cards/ParkingCard';
import { Reveal, Stagger, CountUp } from '../../motion';
import { durations, easing } from '../../motion/tokens';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchDate, setSearchDate] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const featuredParking = demoParkingSpaces.filter((p) => p.isFeatured).slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/explore?query=${searchQuery}&city=${selectedCity}`;
  };

  // Word reveal animation for hero title
  const words = ['Your Perfect Parking Spot.', 'Just a Click Away.'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                {/* Animated Headline */}
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold text-primary leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: durations.base, delay: 0.1, ease: easing }}
                    className="block"
                  >
                    Your Perfect Parking Spot.
                  </motion.span>
                  <motion.span
                    className="block text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: durations.base, delay: 0.2, ease: easing }}
                  >
                    Just a Click Away.
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: durations.base, delay: 0.3, ease: easing }}
                >
                  Discover convenient, secure, and affordable parking spaces wherever you go. Book instantly, pay seamlessly, and park with confidence.
                </motion.p>
              </div>

              {/* Search Form */}
              <motion.form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: durations.base, delay: 0.4, ease: easing }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <MapPin size={20} className="text-primary" />
                    <input
                      type="text"
                      placeholder="Search parking or location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent flex-1 outline-none text-gray-900 placeholder-gray-500"
                    />
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Calendar size={20} className="text-primary" />
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="bg-transparent flex-1 outline-none text-gray-900 placeholder-gray-500"
                    />
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search size={20} />
                  Find Parking
                </motion.button>
              </motion.form>

              {/* Trust Indicators with CountUp */}
              <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: durations.base, delay: 0.5, ease: easing }}
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    <CountUp to={50} format={(v) => `${v}K+`} />
                  </p>
                  <p className="text-sm text-gray-600">Parking Spaces</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    <CountUp to={100} format={(v) => `${v}K+`} />
                  </p>
                  <p className="text-sm text-gray-600">Happy Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    <CountUp to={500} format={(v) => `${v}K+`} />
                  </p>
                  <p className="text-sm text-gray-600">Bookings</p>
                </div>
              </motion.div>
            </div>

            {/* Right Image with Ken Burns effect */}
            <motion.div
              className="relative h-96 lg:h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: durations.base, delay: 0.2, ease: easing }}
            >
              <motion.img
                src={demoParkingSpaces[0].images[0]}
                alt="Premium Parking"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
                animate={{ scale: 1.06 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: durations.base, delay: 0.6, ease: easing }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.8 Rating</span>
                </div>
                <p className="text-sm text-gray-600">Trusted by over 100,000 drivers and hosts</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Locations - Staggered Reveal */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl font-bold text-center">Popular Locations</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularLocations.map((location, idx) => (
              <motion.div key={idx} layoutId={`location-${idx}`}>
                <Link
                  to={`/explore?city=${location.name}`}
                  className="group relative h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <motion.img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: easing }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6"
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white">
                      <h3 className="text-xl font-bold">{location.name}</h3>
                      <p className="text-sm text-gray-200">{location.count} parking spaces</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Featured Parking - Staggered with index prop */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Reveal>
              <h2 className="text-3xl font-bold">Featured Parking Spaces</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/explore"
                className="text-primary hover:text-primary-dark transition-colors font-semibold flex items-center gap-2"
              >
                View All <ArrowRight size={20} />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredParking.map((parking, idx) => (
              <ParkingCard key={parking.id} parking={parking} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - with SVG drawing line (simplified) */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl font-bold text-center">How It Works</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <motion.div key={idx} className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                    whileHover={{ scale: 1.1, backgroundColor: '#2445D4' }}
                  >
                    {idx + 1}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={40} className="text-primary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl font-bold text-center">Why Choose MY_PARKING</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Safe & Secure', desc: '24/7 surveillance and verified hosts' },
              { icon: Zap, title: 'Quick Booking', desc: 'Book in seconds with instant confirmation' },
              { icon: TrendingUp, title: 'Best Prices', desc: 'Affordable rates with no hidden charges' },
              { icon: Users, title: '24/7 Support', desc: 'Round-the-clock customer assistance' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} className="text-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(49, 87, 246, 0.2)' }}
                  >
                    <Icon size={24} className="text-primary" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl font-bold text-center">What Our Users Say</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">&quot;{testimonial.comment}&quot;</p>
                <div className="flex items-center gap-3">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Become a Host CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-light text-white">
        <Reveal className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Turn Your Parking Space Into Income
          </motion.h2>
          <motion.p
            className="text-lg text-white text-opacity-90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            List your parking space and start earning passive income. Hosts earn ₹15,000 - ₹50,000+ per month.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/host"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Become a Host Today <ArrowRight size={24} />
            </Link>
          </motion.div>
        </Reveal>
      </section>

      {/* FAQ with animated height */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
          </Reveal>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <motion.button
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full text-left bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                layout
              >
                <motion.div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === idx ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={24} className="text-primary" />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedFaq === idx ? 1 : 0,
                    height: expandedFaq === idx ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
