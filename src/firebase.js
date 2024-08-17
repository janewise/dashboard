// src/firebase.js
import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/database'; //'firebase/firestore' or 'firebase/database' if using Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyChieGJYU9TGzBlUljWjVqYF2Erb3w2ncE",
  authDomain: "test404track.firebaseapp.com",
  databaseURL: "https://test404track-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test404track",
  storageBucket: "test404track.appspot.com",
  messagingSenderId: "23062101949",
  appId: "1:23062101949:web:b402111fc08f76cf90dcd4",
  measurementId: "G-214Z3KHXPD"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
 const analytics = getAnalytics(firebaseApp);
// Initialize Firestore or Realtime Database
const db = firebaseApp.database(); //firebaseApp.firestore(); or firebaseApp.database();

export { db };
// import firebase from 'firebase/compat/app'; // Importing from 'firebase/compat/app' for Firebase v9+
// import { getAnalytics } from 'firebase/analytics';
// import 'firebase/compat/database'; // Importing from 'firebase/compat/database' for Firebase v9+

// const firebaseConfig = {
//   apiKey: "AIzaSyAei2Enk5qD6cBtosYB66qQwzmUHzrEW1w",
//   authDomain: "bitbrawl-official-airdrop.firebaseapp.com",
//   databaseURL: "https://bitbrawl-official-airdrop-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "bitbrawl-official-airdrop",
//   storageBucket: "bitbrawl-official-airdrop.appspot.com",
//   messagingSenderId: "179762649507",
//   appId: "1:179762649507:web:fe42f84b205d2c0bca2216",
//   measurementId: "G-SVKSDKEN7M"
// };

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

// // Initialize Firestore or Realtime Database
// const db = firebaseApp.database(); // Use firebaseApp.firestore() for Firestore

// export { db };

