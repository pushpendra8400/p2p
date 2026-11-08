import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, MapPin, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAppStore } from '../../store';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.name && formData.phone) {
      setStep(2);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      setLoading(true);
      setTimeout(() => {
        login();
        navigate('/driver/dashboard');
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600">Join MY_PARKING to find or list parking</p>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          </div>

          {/* Form */}
          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-10">
                  <User size={20} className="text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="flex-1 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-10">
                  <Phone size={20} className="text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="flex-1 outline-none"
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-10">
                  <MapPin size={20} className="text-gray-400" />
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="flex-1 outline-none bg-transparent"
                    required
                  >
                    <option value="">Select your city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-10">
                  <Mail size={20} className="text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="flex-1 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-10">
                  <Lock size={20} className="text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    className="flex-1 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-10">
                  <Lock size={20} className="text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="flex-1 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" required />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-primary font-semibold hover:underline"
              >
                Go Back
              </button>
            </form>
          )}

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
