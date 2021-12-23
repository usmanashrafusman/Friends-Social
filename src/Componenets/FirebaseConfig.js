import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAargGSVcs-yN2b65ijEtOIsYjxlKudM1U",
  authDomain: "friends-socail.firebaseapp.com",
  projectId: "friends-socail",
  storageBucket: "friends-socail.appspot.com",
  messagingSenderId: "538316968170",
  appId: "1:538316968170:web:4ee95fd3b285a7caf0c793",
  measurementId: "G-6F4EJBM01S"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app)


