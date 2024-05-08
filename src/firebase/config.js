// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT4hLdpyrA_x2nYlmpdMsVHPb6k2H4HEg",
  authDomain: "chat-app-1fa51.firebaseapp.com",
  projectId: "chat-app-1fa51",
  storageBucket: "chat-app-1fa51.appspot.com",
  messagingSenderId: "917335059411",
  appId: "1:917335059411:web:86f1c7c592425267ac9d26",
  measurementId: "G-7WCJJMECMT",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099");
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", 8081);
}

export { auth, db };

export default firebase;
