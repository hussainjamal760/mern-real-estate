// firebase.js - Complete Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC72boQ1Q6CJEmrIqjWeNQJF9mG_OtSKP0",
  authDomain: "mern-real-estate-5274b.firebaseapp.com",
  projectId: "mern-real-estate-5274b",
  storageBucket: "mern-real-estate-5274b.firebasestorage.app",
  messagingSenderId: "234519486293",
  appId: "1:234519486293:web:7e3cdcdaadc9f0eb8ad9dc",
  // Add database URL for Realtime Database
  databaseURL: "https://mern-real-estate-5274b-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);