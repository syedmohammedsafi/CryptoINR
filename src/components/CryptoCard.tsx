import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CryptoData } from '../services/api';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAuthContext } from './auth/AuthProvider';

interface CryptoCardProps {
  coin: CryptoData;
}

export function CryptoCard({ coin }: CryptoCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const priceChangeColor = coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500';
  const PriceIcon = coin.price_change_percentage_24h >= 0 ? TrendingUp : TrendingDown;

  const handleBuyClick = () => {
    if (user?.email === 'safi22052004@gmail.com') {
      navigate(`/buy/${coin.id}`, { state: { selectedCoin: coin } });
    }
  };

  const handleSellClick = () => {
    if (user?.email === 'safi22052004@gmail.com') {
      navigate(`/sell/${coin.id}`, { state: { selectedCoin: coin } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{coin.name}</h3>
              <span className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</span>
            </div>
          </div>
        </div>

      <div className="space-y-4">
        <div className="bg-black bg-opacity-30 p-4 rounded-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Current Price</span>
            <span className="text-xl font-bold text-white">₹{coin.current_price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">24h Change</span>
            <div className="flex items-center space-x-1">
              <PriceIcon className={`w-4 h-4 ${priceChangeColor}`} />
              <span className={`${priceChangeColor} font-medium`}>
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {user?.email === 'safi22052004@gmail.com' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleBuyClick}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Buy Now</span>
            </button>
            <button
              onClick={handleSellClick}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Sell Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
    </motion.div >
  );
}