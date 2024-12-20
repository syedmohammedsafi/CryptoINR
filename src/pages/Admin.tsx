import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllOrders, updateOrderStatus } from '../services/firebase';

export function AdminPage() {
  const { user } = useAuth();
  const { data: orders, isLoading, refetch } = useQuery('orders', getAllOrders);

  const handleStatusChange = async (
    orderId: string,
    type: 'buy' | 'sell',
    newStatus: 'pending' | 'successful' | 'failed'
  ) => {
    try {
      await updateOrderStatus(orderId, type, newStatus);
      toast.success('Order status updated');
      refetch();
    } catch (error) {
      toast.error('Failed to update order status'+ error);
    }
  };

  if (!user?.email || user.email !== 'safi22052004@gmail.com') {
    return (
      <div className="text-white text-center py-8">
        Access denied. Admin only area.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Buy Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">User Email</th>
                  <th className="p-4 text-left">Crypto Name</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.buyers.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.userName}</td>
                    <td className="p-4">{order.cryptoName}</td>
                    <td className="p-4">₹{order.amount}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, 'buy', e.target.value as 'pending' | 'successful' | 'failed')}
                          className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                        >
                          <option value="pending">Pending</option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sell Orders Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Sell Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">User Email</th>
                  <th className="p-4 text-left">Crypto Name</th>
                  <th className="p-4 text-left">Crypto Amount</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.sellers.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.userName}</td>
                    <td className="p-4">{order.cryptoName}</td>
                    <td className="p-4">{order.amount}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, 'sell', e.target.value as 'pending' | 'successful' | 'failed')}
                          className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                        >
                          <option value="pending">Pending</option>
                          <option value="successful">Successful</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
