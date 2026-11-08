import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-gray-600">Enter your email to reset your password</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-10">
                  <Mail size={20} className="text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Send Reset Link
              </button>

              <Link to="/login" className="block text-center text-primary hover:underline font-medium">
                Back to Login
              </Link>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-4">
              <div className="text-4xl text-green-600">✓</div>
              <h2 className="text-xl font-bold text-gray-900">Check Your Email</h2>
              <p className="text-gray-600">
                We've sent a password reset link to {email}. Click the link to create a new password.
              </p>
              <Link to="/login" className="inline-block text-primary hover:underline font-medium">
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
