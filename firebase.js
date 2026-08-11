

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  apiKey: "AIzaSyDpSAoAS4-bH7HY_a1M7G76uvj1JDEggfk",
  authDomain: "raaz-f329f.firebaseapp.com",
  projectId: "raaz-f329f",
  storageBucket: "raaz-f329f.firebasestorage.app",
  messagingSenderId: "222039340028",
  appId: "1:222039340028:web:12b5389375b026d2e9f879",
  measurementId: "G-8E943YW9L1"
};
  


const app = initializeApp(firebaseConfig);

// EXPORT THESE 👇
export const auth = getAuth(app);
export const db = getFirestore(app);
