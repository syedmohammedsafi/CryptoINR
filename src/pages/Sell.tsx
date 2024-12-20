import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createSellerOrder } from '../services/firebase';
import { TradingDisclaimer } from '../components/trading/TradingDisclaimer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navbar } from '../components/Navbar';

export function SellPage() {
  const { user } = useAuth();
  const location = useLocation();
  const selectedCoin = location.state?.selectedCoin;

  const [cryptoAmount, setCryptoAmount] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [conversionRate, setConversionRate] = useState(0);
  const [isConverted, setIsConverted] = useState(false);
  const [bankAccount, setBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const isUSDT = selectedCoin?.symbol.toLowerCase() === 'usdt';

  useEffect(() => {
    const fetchConversionRate = async () => {
      if (!isUSDT && selectedCoin) {
        try {
          const response = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${selectedCoin.symbol.toUpperCase()}USDT`
          );
          setConversionRate(parseFloat(response.data.price));
        } catch (error) {
          toast.error('Failed to fetch conversion rate');
          console.error(error);
        }
      }
    };

    fetchConversionRate();
  }, [selectedCoin, isUSDT]);

  const handleCryptoAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCryptoAmount(value);

    if (isUSDT) {
      setUsdtAmount(value);
    }
  };

  const handleConversion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cryptoAmount || parseFloat(cryptoAmount) <= 0) {
      toast.error('Please enter a valid amount to convert');
      return;
    }

    if (conversionRate <= 0) {
      toast.error('Conversion rate unavailable');
      return;
    }

    const convertedAmount = parseFloat(cryptoAmount) * conversionRate;
    setUsdtAmount(convertedAmount.toFixed(6));
    setIsConverted(true);
    toast.success(`${cryptoAmount} ${selectedCoin?.name} converted to ${convertedAmount} USDT`);
  };

  const handleSellSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to continue');
      return;
    }

    const finalUsdtAmount = parseFloat(usdtAmount);
    if (!finalUsdtAmount || finalUsdtAmount <= 0) {
      toast.error('Invalid USDT amount');
      return;
    }

    try {
      await createSellerOrder({
        userId: user.uid,
        userName: user.email || 'Unknown User',
        type: 'sell',
        cryptoName: 'USDT',
        amount: finalUsdtAmount,
        status: 'pending',
        paymentDetails: {
          bankAccount,
          ifscCode,
        },
      });

      toast.success('Sell order submitted successfully!');
      setCryptoAmount('');
      setBankAccount('');
      setIfscCode('');
      setUsdtAmount('');
      setIsConverted(false);
    } catch (error) {
      toast.error('Failed to submit sell order');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Sell Cryptocurrency</h1>

        <TradingDisclaimer />

        {selectedCoin && (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-4">
              <img src={selectedCoin.image} alt={selectedCoin.name} className="w-12 h-12" />
              <div>
                <h2 className="text-xl font-bold text-white">{selectedCoin.name}</h2>
                {!isUSDT && (
                  <p className="text-gray-400">
                    Conversion Rate: 1 {selectedCoin.symbol.toUpperCase()} ≈ {conversionRate} USDT
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {!isUSDT && !isConverted && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl text-white font-bold mb-4">Convert to USDT</h2>
            <form onSubmit={handleConversion} className="space-y-6">
              <div>
                <label className="block text-white mb-2">{selectedCoin?.name} Amount</label>
                <input
                  type="number"
                  step="0.000001"
                  value={cryptoAmount}
                  onChange={handleCryptoAmountChange}
                  className="w-full bg-gray-700 text-white rounded-lg p-3"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
              >
                Convert to USDT
              </button>
            </form>
          </div>
        )}

        {(isUSDT || isConverted) && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl text-white font-bold mb-4">Sell USDT</h2>
            <form onSubmit={handleSellSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">USDT Amount</label>
                <input
                  type="number"
                  value={usdtAmount}
                  onChange={isUSDT ? (e) => setUsdtAmount(e.target.value) : undefined}
                  readOnly={!isUSDT}
                  className="w-full bg-gray-700 text-white rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Bank Account Number</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">IFSC Code</label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg p-3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
              >
                Submit Sell Order
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
