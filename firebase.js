import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB81nSExFt8JveEugFPGwlJ_LKqsAKBifA",
  authDomain: "golfappen.firebaseapp.com",
  projectId: "golfappen",
  storageBucket: "golfappen.appspot.com",
  messagingSenderId: "806456860715",
  appId: "1:806456860715:web:53d1781c65e0718017ca6e",
  measurementId: "G-3RBLET3966",
};


 firebase.initializeApp(firebaseConfig);


export default firebase;
