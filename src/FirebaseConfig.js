// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMpEPBZMkQqvDnwSX6T9Yzvciq9VcNHzc",
    authDomain: "my-house-413015.firebaseapp.com",
    projectId: "my-house-413015",
    storageBucket: "my-house-413015.appspot.com",
    messagingSenderId: "357144792506",
    appId: "1:357144792506:web:fd1b300494a95deaa02183",
    measurementId: "G-ZX54QDKCZB"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(firebaseApp);
