// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCyaeGOMMiyKQ-GCGXulZLYs5C6uQ6hkh0",
    authDomain: "cardcollect-dd8e2.firebaseapp.com",
    projectId: "cardcollect-dd8e2",
    storageBucket: "cardcollect-dd8e2.firebasestorage.app",
    messagingSenderId: "1052807908921",
    appId: "1:1052807908921:web:a448e2bf097564e42b47e8",
    measurementId: "G-LDC4X3KC39"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db }