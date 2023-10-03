import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context.js";
import { addDoc } from "firebase/firestore";
import { gamesCollection } from "../services/firebase.js";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate } from "react-router-dom";
import "../css/QuizScore.css";
import { Button } from "@mui/material";

function QuizScore() {
	const {
		displayResults,
		allQuestions,
		setAllQuestions,
		setDisplayResults,
		currentUser,
		quizHistory,
		quizHistoryQuestions,
	} = useContext(Context);

	const navigate = useNavigate();
	useEffect(() => {
		async function updateGamesCollection() {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = (currentDate.getMonth() + 1)
				.toString()
				.padStart(2, "0");
			const day = currentDate.getDate().toString().padStart(2, "0");
			const hours = currentDate.getHours().toString().padStart(2, "0");
			const minutes = currentDate
				.getMinutes()
				.toString()
				.padStart(2, "0");
			const seconds = currentDate
				.getSeconds()
				.toString()
				.padStart(2, "0");

			const timeStamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			if (allQuestions) {
				let score = 0;
				for (let i = 0; i < allQuestions.length; i++) {
					if (allQuestions[i].answeredCorrectly === true) {
						score++;
					}
				}

				await setAllQuestions((prevAllQuestions) => ({
					currentUser: currentUser.email,
					questions: prevAllQuestions,
					score: score,
					timeStampSubmitted: timeStamp,
				}));
				await addDoc(gamesCollection, {
					currentUser: currentUser.email,
					questions: allQuestions,
					score: score,
					timeStampSubmitted: timeStamp,
				});
			}
		}

		updateGamesCollection();
	}, [displayResults]);

	function handlePlayAgainClick() {
		navigate("/quizSelection");
		setDisplayResults(null);
		setAllQuestions(null);
	}
	return (
		<div>
			{!quizHistory ? (
				<div className="quiz-score">
					{allQuestions.questions && (
						<div className="quiz-score-count">
							{"You scored " +
								allQuestions.score +
								"/" +
								allQuestions.questions.length}
						</div>
					)}

					<Button
						className="play-again-button"
						onClick={handlePlayAgainClick}
						variant="contained"
						endIcon={
							<ReplayIcon
								sx={{ transform: "scaleX(-1) rotate(222deg)" }}
							/>
						}
					>
						Play Again
					</Button>
				</div>
			) : (
				<div className="quiz-score">
					{quizHistoryQuestions.questions && (
						<div className="quiz-score-count">
							{"You scored " +
								quizHistoryQuestions.score +
								"/" +
								quizHistoryQuestions.questions.length}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default QuizScore;
