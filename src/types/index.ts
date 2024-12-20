export interface Package {
  id: string;
  amount: number;
  name: string;
}

export interface BuyOrder {
  id: string;
  userId: string;
  packageId: string;
  amount: number;
  cryptoAddress: string;
  network: string;
  utrNumber: string;
  status: 'pending' | 'completed' | 'rejected';
  timestamp: Date;
}

export interface SellOrder {
  id: string;
  userId: string;
  amount: number;
  bankAccount: string;
  ifscCode: string;
  cryptoAmount: number;
  status: 'pending' | 'completed' | 'rejected';
  timestamp: Date;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}