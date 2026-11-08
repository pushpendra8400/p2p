import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Wallet, Shield } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BookingPayment: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment
    setTimeout(() => {
      navigate(`/checkout/booking/${id}/confirmation`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-primary hover:underline">
            <ChevronLeft size={20} />
            Back
          </button>
          <span className="text-gray-600">/ Payment</span>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="w-5 h-5 text-primary"
              />
              <div className="flex-1">
                <p className="font-semibold">UPI</p>
                <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm, etc.</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Unified_Payments_Logo.svg" alt="UPI" className="w-8 h-8" />
              </div>
            </label>

            <label className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="w-5 h-5 text-primary"
              />
              <div className="flex-1">
                <p className="font-semibold">Credit / Debit Card</p>
                <p className="text-sm text-gray-600">Visa, Mastercard, Rupay</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-gray-400">VISA</div>
                <div className="text-xs font-bold text-gray-400">MC</div>
              </div>
            </label>

            <label className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={() => setPaymentMethod('wallet')}
                className="w-5 h-5 text-primary"
              />
              <div className="flex-1">
                <p className="font-semibold">Wallet</p>
                <p className="text-sm text-gray-600">Amazon Pay, Paytm, Mobikwik</p>
              </div>
              <Wallet size={24} className="text-gray-400" />
            </label>

            <label className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={paymentMethod === 'netbanking'}
                onChange={() => setPaymentMethod('netbanking')}
                className="w-5 h-5 text-primary"
              />
              <div className="flex-1">
                <p className="font-semibold">Net Banking</p>
                <p className="text-sm text-gray-600">All major banks</p>
              </div>
              <CreditCard size={24} className="text-gray-400" />
            </label>
          </div>

          {/* Demo Payment Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <div className="mt-1">
              <Shield size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-yellow-800">Demo Payment Mode</p>
              <p className="text-sm text-yellow-700 mt-1">
                This is a demo payment. No actual charges will be made to your account.
              </p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full mt-6 bg-primary text-white py-4 rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 text-lg flex items-center justify-center gap-2"
          >
            <CreditCard size={24} />
            {loading ? 'Processing Payment...' : `Pay ₹1,234`}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            <Shield size={16} className="inline mr-1" />
            256-bit SSL Encrypted Payment
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPayment;