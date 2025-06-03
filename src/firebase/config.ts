import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyDkx3-2e6n2Uf6OwAiupUUw9NfaMaR_Im0",
  authDomain: "umra-1.firebaseapp.com",
  projectId: "umra-1",
  storageBucket: "umra-1.firebasestorage.app",
  messagingSenderId: "268329801965",
  appId: "1:268329801965:web:97b2a249690049ecc9d4e4",
  measurementId: "G-RJTR9QV9L2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
