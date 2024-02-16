// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "real-estate-mern-abf8f.firebaseapp.com",
  projectId: "real-estate-mern-abf8f",
  storageBucket: "real-estate-mern-abf8f.appspot.com",
  messagingSenderId: "435761393304",
  appId: "1:435761393304:web:c9b301a01a3486b28a6aed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);