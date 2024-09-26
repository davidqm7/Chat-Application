
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCNVqABto6QjXAdh57yxKgA7YSYchEAA3s",  // process.env.REACT_APP_FIREBASE_API_KEY
  authDomain: "chat-application-b414e.firebaseapp.com",  //process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
  projectId: "chat-application-b414e",   //process.env.REACT_APP_FIREBASE_PROJECT_ID
  storageBucket: "chat-application-b414e.appspot.com",   //process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
  messagingSenderId:"794236905156",   //process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:794236905156:web:51694920f4c9a99ebf0b91"   //process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app); 

export{db, auth}; 