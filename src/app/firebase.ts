// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO-Y3PVUsr3b9NMDEHxPSXHLlg1aL4a6E",
  authDomain: "malfuzatehaider.firebaseapp.com",
  projectId: "malfuzatehaider",
  storageBucket: "malfuzatehaider.firebasestorage.app",
  messagingSenderId: "310680318793",
  appId: "1:310680318793:web:7a999b1b57a023784f2098"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 