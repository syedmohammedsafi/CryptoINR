export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'buy' | 'sell';
  cryptoName: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  timestamp: Date;
  paymentDetails: {
    utrNumber?: string;
    bankAccount?: string;
    ifscCode?: string;
  };
}

export interface TransactionStats {
  totalTransactions: number;
  totalVolume: number;
  pendingTransactions: number;
  completedTransactions: number;
}