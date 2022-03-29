import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "queueboard-ebd4c.firebaseapp.com",
    projectId: "queueboard-ebd4c",
    storageBucket: "queueboard-ebd4c.appspot.com",
    messagingSenderId: "190006607079",
    appId: "1:190006607079:web:b946b610d9497aad57f642"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore()