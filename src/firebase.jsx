
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"; 

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_API_KEY,  // process.env.REACT_APP_FIREBASE_API_KEY
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,  //process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,   //process.env.REACT_APP_FIREBASE_PROJECT_ID
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,   //process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,   //process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  appId: process.env.REACT_APP_FIREBASE_APP_ID   //process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app); 

export{db, auth}; 