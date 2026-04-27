import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
    
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "booknest-jas.firebaseapp.com",
    projectId: "booknest-jas",
    storageBucket: "booknest-jas.firebasestorage.app",
    messagingSenderId: "519593864118",
    appId: "1:519593864118:web:08308f1737039e442aaf17"
};
    
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();