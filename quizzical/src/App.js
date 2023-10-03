import React, { useContext } from "react";
import "./css/App.css";
import Quiz from "./components/Quiz";
import { Provider } from "./context/Context";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Context } from "./context/Context.js";
import History from "./components/History";
import QuizHistory from "./components/QuizHistory";
import Leaderboard from "./components/Leaderboard";
import ResetPassword from "./components/ResetPassword";
import QuizSelection from "./components/QuizSelection";
const App = () => {
	const { quizData } = useContext(Context);
	return (
		<>
			<Routes>
				<Route path="/" element={<Homepage />} />
				{quizData?.length > 0 && (
					<Route
						path="/quiz"
						element={<Quiz questions={quizData} />}
					/>
				)}
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/history" element={<History />} />
				<Route path="/quizHistory" element={<QuizHistory />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route path="/resetPassword" element={<ResetPassword />} />
				<Route path="/quizSelection" element={<QuizSelection />} />
			</Routes>
		</>
	);
};

export default () => {
	return (
		<Provider>
			<App />
		</Provider>
	);
};
