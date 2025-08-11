// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4WFxnc3-YGAMcV-E5ZlNkuQGZREQGVXY",
  authDomain: "ethereal-nuptial-glow.firebaseapp.com",
  projectId: "ethereal-nuptial-glow",
  storageBucket: "ethereal-nuptial-glow.firebasestorage.app",
  messagingSenderId: "754869535152",
  appId: "1:754869535152:web:d08a8e9712b07f3c365675",
  measurementId: "G-CSV7YBPRME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export default app;