import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAjNUj3qN5GK8Mbwm8i4sZuDMhE9_Bj_YM",
  authDomain: "metamansions-51577.firebaseapp.com",
  projectId: "metamansions-51577",
  storageBucket: "metamansions-51577.firebasestorage.app",
  messagingSenderId: "377440842847",
  appId: "1:377440842847:web:7649d6f4e0ee3f4214d7ea",
  measurementId: "G-M7SMF5QJBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage }; 