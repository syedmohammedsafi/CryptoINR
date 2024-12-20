import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function createBuyerOrder(data: {
  userId: string;
  userName: string;
  type: string;
  cryptoName: string;
  amount: number;
  status: string;
  paymentDetails: {
    utrNumber: string;
    cryptoAddress: string;
    network: string;
  };
}) {
  const buyersCollectionRef = collection(db, "Buyers");

  try {
    const docRef = await addDoc(buyersCollectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error saving buyer order: ", error);
    throw new Error("Failed to save buyer order");
  }
}

export async function createSellerOrder(data: {
  userId: string;
  userName: string;
  type: string;
  cryptoName: string;
  amount: number;
  status: string;
  paymentDetails: {
    bankAccount: string;
    ifscCode: string;
  };
}) {
  const sellersCollectionRef = collection(db, "Sellers");

  try {
    const docRef = await addDoc(sellersCollectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error saving seller order: ", error);
    throw new Error("Failed to save seller order");
  }
}

export const getAllOrders = async () => {
  const buyersCollection = await getDocs(collection(db, 'Buyers'));
  const sellersCollection = await getDocs(collection(db, 'Sellers'));
  
  return {
    buyers: buyersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    sellers: sellersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  };
};

export const updateOrderStatus = async (orderId, type, status) => {
  const collectionRef = type === 'buy' ? 'Buyers' : 'Sellers';
  const orderRef = doc(db, collectionRef, orderId);

  await updateDoc(orderRef, {
    status: status
  });
};