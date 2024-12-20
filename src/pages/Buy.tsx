import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PACKAGES } from '../config/packages';
import { createBuyerOrder } from '../services/firebase';
import { TradingDisclaimer } from '../components/trading/TradingDisclaimer';
import toast from 'react-hot-toast';
import { Navbar } from '../components/Navbar';

export function BuyPage() {
  const { user } = useAuth();
  const location = useLocation();
  const selectedCoin = location.state?.selectedCoin;

  const [selectedPackage, setSelectedPackage] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to continue');
      return;
    }

    try {
      const pkg = PACKAGES.find(p => p.id === selectedPackage);
      if (!pkg) return;

      await createBuyerOrder({
        userId: user.uid,
        userName: user.email || 'Unknown User',
        type: 'buy',
        cryptoName: selectedCoin?.name || 'Unknown Crypto',
        amount: pkg.amount,
        status: 'pending',
        paymentDetails: {
          utrNumber,
          cryptoAddress,
          network
        }
      });

      toast.success('Order submitted successfully!');
      setSelectedPackage('');
      setCryptoAddress('');
      setNetwork('');
      setUtrNumber('');
    } catch (error) {
      toast.error('Failed to submit order');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Buy Cryptocurrency</h1>

        <TradingDisclaimer />

        {selectedCoin && (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-4">
              <img src={selectedCoin.image} alt={selectedCoin.name} className="w-12 h-12" />
              <div>
                <h2 className="text-xl font-bold text-white">{selectedCoin.name}</h2>
                <p className="text-gray-400">Current Price: ₹{selectedCoin.current_price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl text-white font-semibold mb-6">Payment Details</h2>

          <div className="bg-gray-700 rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl text-white font-bold">UPI Ids</h3>
            <p className="text-white text-sm mt-4">
              <span className="text-white text-lg">safi22052004@okhdfcbank</span> (or)
              <span className="text-white text-lg"> sureshyr2gfr@okhdfcbank</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Select Package</label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg p-3"
                required
              >
                <option value="">Choose a package...</option>
                {PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Crypto Deposit Address</label>
              <input
                type="text"
                value={cryptoAddress}
                onChange={(e) => setCryptoAddress(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Network</label>
              <input
                type="text"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg p-3"
                required
                placeholder="Ton, Binance Smart Chain, etc."
              />
            </div>

            <div>
              <label className="block text-white mb-2">UTR Number</label>
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg p-3"
                required
                placeholder="Transaction ID (or) Reference Number"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
