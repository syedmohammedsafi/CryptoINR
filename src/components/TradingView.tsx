import { formatDistanceToNow } from 'date-fns';

interface Trade {
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: Date;
  cryptocurrency: string;
}

interface TradingViewProps {
  trades: Trade[];
}

export function TradingView({ trades }: TradingViewProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Recent Trades</h2>
      <div className="space-y-4">
        {trades.map((trade, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`${
                  trade.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
                } p-2 rounded-full`}
              >
                <span className="text-white text-sm font-bold">
                  {trade.type.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{trade.cryptocurrency}</p>
                <p className="text-gray-400 text-sm">
                  {formatDistanceToNow(trade.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">
                ${trade.price.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">{trade.amount} coins</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}