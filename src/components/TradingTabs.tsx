import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export function TradingTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="bg-gray-800/50 p-2 rounded-lg backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/buy')}
            className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-lg transition-all duration-300 ${
              currentPath === '/buy'
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <ArrowDownCircle className="w-5 h-5" />
            <span>Buy</span>
          </button>
          <button
            onClick={() => navigate('/sell')}
            className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-lg transition-all duration-300 ${
              currentPath === '/sell'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <ArrowUpCircle className="w-5 h-5" />
            <span>Sell</span>
          </button>
        </div>
      </div>
    </div>
  );
}