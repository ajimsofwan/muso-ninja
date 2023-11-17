import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "musoninjas-ca821.firebaseapp.com",
  projectId: "musoninjas-ca821",
  storageBucket: "musoninjas-ca821.appspot.com",
  messagingSenderId: "342672158163",
  appId: "1:342672158163:web:6c13d8f0baad1abdded326",
};

// init firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const storage = firebase.storage();

export { auth, firestore, storage, timestamp };
