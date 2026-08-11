
import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.querySelector(".auth-form");

// ✅ FIX: added { }
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // ✅ ADDED: safe name handling
      const name = nameInput ? nameInput.value.trim() : null;

      // ✅ ADDED: validation
      if (!email || !password) {
        alert("Please fill all fields");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      // ✅ FIX: better signup detection
      const isSignupPage = nameInput !== null;

      // ✅ SIGNUP
      if (isSignupPage) {

        // ✅ ADDED: name validation
        if (!name) {
          alert("Please enter your name");
          return;
        }

        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          name: name,
          email: email,
          createdAt: new Date()
        });

        alert("Signup successful ✅");
        window.location.href = "signin.html";
      }

      // ✅ SIGNIN
      else {
        await signInWithEmailAndPassword(auth, email, password);

        alert("Login successful ✅");
        window.location.href = "index.html";
      }

    } catch (error) {
      console.error(error);

      // 🔥 Handle ONLY real errors
      if (error.code === "auth/email-already-in-use") {
        alert("Account already exists. Please login.");
        window.location.href = "signin.html";
      }
      else if (error.code === "auth/user-not-found") {
        alert("No account found. Please sign up first.");
        window.location.href = "signup.html";
      }

      // ✅ ADDED: more error handling
      else if (error.code === "auth/wrong-password") {
        alert("Incorrect password");
      }
      else if (error.code === "auth/invalid-email") {
        alert("Invalid email format");
      }

      else {
        alert(error.message);
      }
    }
  });
}