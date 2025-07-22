// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBelecb2qPCqN_ayaZahZ648PBYYfQjxvc",
  authDomain: "revoltecommerce-13919.firebaseapp.com",
  databaseURL: "https://revoltecommerce-13919-default-rtdb.firebaseio.com",
  projectId: "revoltecommerce-13919",
  storageBucket: "revoltecommerce-13919.firebasestorage.app",
  messagingSenderId: "545964584014",
  appId: "1:545964584014:web:995fcc64bc2dd964ffa71f",
  measurementId: "G-2Y6PM33JY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push };

