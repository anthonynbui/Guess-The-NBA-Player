// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI5xTSY6Y1TI4FyvtGFHKyaTevnmf7OVE",
  authDomain: "guess-nba-player-c79d2.firebaseapp.com",
  projectId: "guess-nba-player-c79d2",
  storageBucket: "guess-nba-player-c79d2.appspot.com",
  messagingSenderId: "684505876685",
  appId: "1:684505876685:web:0f891cf41a58cc14804184",
  measurementId: "G-E2TV7EKMF9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);