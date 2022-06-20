// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJXMNDgCLYZoBWqpidM3v5PgRkbqxAKpQ",
  authDomain: "reactauth-1087a.firebaseapp.com",
  projectId: "reactauth-1087a",
  storageBucket: "reactauth-1087a.appspot.com",
  messagingSenderId: "764244059082",
  appId: "1:764244059082:web:0f75ce176d95f326362533",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
