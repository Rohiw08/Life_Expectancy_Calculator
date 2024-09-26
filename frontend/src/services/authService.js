// src/services/authService.js

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig"; // Adjust as needed

const googleProvider = new GoogleAuthProvider();

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        throw new Error(err.message);
    }
};

const signup = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        throw new Error(err.message);
    }
};

const googleSignIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        throw new Error(err.message);
    }
};

export { login, signup, googleSignIn };
