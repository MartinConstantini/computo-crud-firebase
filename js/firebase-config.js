import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0m_hXM5iRk3g6HGeXmdBtJlwlh0jE_u4",
  authDomain: "mars-computo-ad2025-415fa.firebaseapp.com",
  projectId: "mars-computo-ad2025-415fa",
  storageBucket: "mars-computo-ad2025-415fa.firebasestorage.app",
  messagingSenderId: "833077115215",
  appId: "1:833077115215:web:42cb27c0348ede3ed52d3a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };