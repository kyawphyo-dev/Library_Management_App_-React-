// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWjXMqDxVL0V-JRMicJtcGumNAevBFvWM",
  authDomain: "library-management-syste-cc056.firebaseapp.com",
  projectId: "library-management-syste-cc056",
  storageBucket: "library-management-syste-cc056.firebasestorage.app",
  messagingSenderId: "355411088157",
  appId: "1:355411088157:web:b7e1c3bf11aa1595df87f4",
  measurementId: "G-R0WFR3KED6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
