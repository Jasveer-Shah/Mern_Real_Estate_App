// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "travel-agency-main.firebaseapp.com",
  databaseURL: "https://travel-agency-main-default-rtdb.firebaseio.com",
  projectId: "travel-agency-main",
  storageBucket: "travel-agency-main.appspot.com",
  messagingSenderId: "1065103858068",
  appId: "1:1065103858068:web:0daf2920f37c63e0369781",
  measurementId: "G-KHEMG2GKLR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

