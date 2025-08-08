import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getfirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
  
const firebaseConfig = {
    apiKey: "AIzaSyDeiBBkOofPc-KnDbXOJ62WwW8CIAgdxq4",
    authDomain: "mars-computo-ad2025-b749c.firebaseapp.com",
    projectId: "mars-computo-ad2025-b749c",
    storageBucket: "mars-computo-ad2025-b749c.firebasestorage.app",
    messagingSenderId: "489426893265",
    appId: "1:489426893265:web:1e92b77435b5d43c1948f0"
};

  
const app = initializeApp(firebaseConfig);
const db = getFirestore(ap)

export { db }