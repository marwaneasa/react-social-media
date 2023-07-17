// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore' //database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuN7LfuT-Z0R85A9t9vch_gF-qX6ZCydE",
  authDomain: "social-media-c4115.firebaseapp.com",
  projectId: "social-media-c4115",
  storageBucket: "social-media-c4115.appspot.com",
  messagingSenderId: "328157815076",
  appId: "1:328157815076:web:5f58f8e2a6836c82a793b1"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);