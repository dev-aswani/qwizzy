import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCwTi8UNPRh7qN-1Q8KAPwDtMRbEwMMayA",
	authDomain: "quizzical-fd57f.firebaseapp.com",
	projectId: "quizzical-fd57f",
	storageBucket: "quizzical-fd57f.appspot.com",
	messagingSenderId: "515631011074",
	appId: "1:515631011074:web:c260ff13c9cdb5d1661e1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const gamesCollection = collection(db, "game");
export default app;
