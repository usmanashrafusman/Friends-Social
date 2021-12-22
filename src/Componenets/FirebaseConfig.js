import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBsWjzarxIytBd-Pq6H1t6-2dsB0MHd_1A",
    authDomain: "friends-smit.firebaseapp.com",
    projectId: "friends-smit",
    storageBucket: "friends-smit.appspot.com",
    messagingSenderId: "208897090972",
    appId: "1:208897090972:web:2c5399a2944263ef219459",
    measurementId: "G-X4EKDGVDY5"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app)


