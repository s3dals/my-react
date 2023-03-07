import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: "my-firebase-d479a",
    storageBucket: "my-firebase-d479a.appspot.com",
    messagingSenderId: "688686201125",
    appId: "1:688686201125:web:117037957005547faa42cc",
    measurementId: "G-114YZB7CQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = new getFirestore(app);
export const storage = getStorage(app);
