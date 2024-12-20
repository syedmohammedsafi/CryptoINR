import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAOVjqclc284nt0mHDkmLebeAWnGS4kscM",
  authDomain: "cryptoinr-fe996.firebaseapp.com",
  projectId: "cryptoinr-fe996",
  storageBucket: "cryptoinr-fe996.firebasestorage.app",
  messagingSenderId: "600359839511",
  appId: "1:600359839511:web:b5aa384f48572b4cbf7952",
  measurementId: "G-JHET29H6ZH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);