// Copyright (c) 2024 Eray Erdin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMk1GSYhdUsKlggKaDHUOsBvpUOTKkw_s",
  authDomain: "fireact-6df39.firebaseapp.com",
  projectId: "fireact-6df39",
  storageBucket: "fireact-6df39.appspot.com",
  messagingSenderId: "452126357955",
  appId: "1:452126357955:web:56de581ef424bda6d52576",
  measurementId: "G-KDELK2YYB4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

connectFirestoreEmulator(firestore, "127.0.0.1", 8080);

export default app;
