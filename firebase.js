// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "student-data-1-e032e.firebaseapp.com",
  projectId: "student-data-1-e032e",
  storageBucket: "student-data-1-e032e.firebasestorage.app",
  messagingSenderId: "433521725238",
  appId: "1:433521725238:android:d4605925a3b7c3ea7ead97",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
