import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase.js";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	fetchSignInMethodsForEmail,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from "firebase/auth";
import { cloneDeep } from "lodash";
export const Context = createContext();

export const Provider = ({ children }) => {
	const [displayResults, setDisplayResults] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [allQuestions, setAllQuestions] = useState(null);
	const [loading, setLoading] = useState(true);
	const [quizHistory, setQuizHistory] = useState(false);
	const [quizHistoryQuestions, setQuizHistoryQuestions] = useState(null);
	const [quizData, setQuizData] = useState(null);
	async function signup(email, password) {
		return await createUserWithEmailAndPassword(auth, email, password);
	}
	async function login(email, password) {
		return await signInWithEmailAndPassword(auth, email, password);
	}
	async function logout() {
		return await signOut(auth);
	}
	async function signInMethods(email) {
		return await fetchSignInMethodsForEmail(auth, email);
	}
	async function resetPassword(email) {
		return await sendPasswordResetEmail(auth, email);
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setDisplayResults(null);
			if (user) {
				setLoading(false);
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
		});
		return unsubscribe;
	}, []);
	return (
		<Context.Provider
			value={{
				displayResults,
				setDisplayResults,
				signup,
				signInMethods,
				login,
				logout,
				currentUser,
				setAllQuestions,
				allQuestions,
				quizHistory,
				setQuizHistory,
				quizHistoryQuestions,
				setQuizHistoryQuestions,
				resetPassword,
				quizData,
				setQuizData,
			}}
		>
			{children}
		</Context.Provider>
	);
};
