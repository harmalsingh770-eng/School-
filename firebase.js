import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi2h9z4_KjUAUs6-j2o9c-GWc8mD32TsE",
  authDomain: "student-data-1-e032e.firebaseapp.com",
  projectId: "student-data-1-e032e",
  storageBucket: "student-data-1-e032e.firebasestorage.app",
  messagingSenderId: "433521725238",
  appId: "1:433521725238:web:dbf33fc5786132227ead97"
};

// Init
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

export default app;