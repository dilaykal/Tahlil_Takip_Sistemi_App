// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//const { initializeApp } = require("firebase/app");
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDanUvSkK2MEAZ0wYtzyaIhTnSqTE_t5KE",
  authDomain: "mobiluygulamaproje-c156f.firebaseapp.com",
  projectId: "mobiluygulamaproje-c156f",
  storageBucket: "mobiluygulamaproje-c156f.firebasestorage.app",
  messagingSenderId: "250917662870",
  appId: "1:250917662870:web:91d64d295484d45268d2b7",
  measurementId: "G-TNB0KXVJV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const db = getFirestore(app);
console.log(app);