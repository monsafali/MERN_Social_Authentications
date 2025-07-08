
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIkEY,
  authDomain: "fir-8e245.firebaseapp.com",
  projectId: "fir-8e245",
  storageBucket: "fir-8e245.firebasestorage.app",
  messagingSenderId: "950771741673",
  appId: "1:950771741673:web:01287dc34dfda69f1b9178",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
