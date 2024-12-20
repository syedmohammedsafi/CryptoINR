import { AlertTriangle } from 'lucide-react';

export function TradingDisclaimer() {
  return (
    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 my-6">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
        <div className="text-yellow-200 text-sm">
          <p className="font-semibold mb-2">Important Risk Disclosure:</p>
          <p className="mb-2">
            Cryptocurrency trading involves substantial risk of loss. Only invest what you can afford to lose.
            Past performance does not guarantee future results.
          </p>
          <p>
            Please read our{' '}
            <a href="/terms" className="text-yellow-400 hover:text-yellow-300 underline">
              terms of service
            </a>{' '}
            before trading.
          </p>
        </div>
      </div>
    </div>
  );
}