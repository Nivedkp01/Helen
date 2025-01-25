import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA31m-WIvuzNVewp_0elWjo5L6wYKXuCtY",
  authDomain: "helen-d0ea4.firebaseapp.com",
  projectId: "helen-d0ea4",
  storageBucket: "helen-d0ea4.firebasestorage.app",
  messagingSenderId: "105025181061",
  appId: "1:105025181061:web:0e7710073c1da53aaa60ec",
  measurementId: "G-0DHR1H6DSC",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
