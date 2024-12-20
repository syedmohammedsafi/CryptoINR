import React from 'react';
import { useQuery } from 'react-query';
import { getAllTransactions, getTransactionStats } from '../../services/firebase';
import { Transaction, TransactionStats } from '../../types/transaction';
import { Loader2, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

function StatCard({ title, value, icon: Icon, className }: { 
  title: string;
  value: string | number;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
    </div>
  );
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Crypto</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-gray-700">
              <td className="p-4">{tx.userName}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  tx.type === 'buy' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                }`}>
                  {tx.type.toUpperCase()}
                </span>
              </td>
              <td className="p-4">{tx.cryptoName}</td>
              <td className="p-4">₹{tx.amount.toLocaleString()}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  tx.status === 'completed' ? 'bg-green-900 text-green-200' :
                  tx.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-red-900 text-red-200'
                }`}>
                  {tx.status.toUpperCase()}
                </span>
              </td>
              <td className="p-4">{new Date(tx.timestamp).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminDashboard() {
  const { data: transactions, isLoading: txLoading } = useQuery('transactions', getAllTransactions);
  const { data: stats, isLoading: statsLoading } = useQuery('transactionStats', getTransactionStats);

  if (txLoading || statsLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Volume"
          value={`₹${(stats?.totalVolume || 0).toLocaleString()}`}
          icon={TrendingUp}
        />
        <StatCard
          title="Total Transactions"
          value={stats?.totalTransactions || 0}
          icon={TrendingUp}
        />
        <StatCard
          title="Pending Transactions"
          value={stats?.pendingTransactions || 0}
          icon={Clock}
        />
        <StatCard
          title="Completed Transactions"
          value={stats?.completedTransactions || 0}
          icon={CheckCircle}
        />
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
        <TransactionTable transactions={transactions || []} />
      </div>
    </div>
  );
}