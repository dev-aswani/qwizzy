import Question from "./Question.js";
import { useState } from "react";
import CheckButton from "./CheckButton.js";
import { nanoid } from "nanoid";
import "../css/Quiz.css";
import NavigationBar from "./NavigationBar.js";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context.js";
import QuizScore from "./QuizScore.js";
function Quiz({ questions }) {
	const { allQuestions, displayResults, quizHistory } = useContext(Context);
	return (
		<div className="quiz">
			<NavigationBar />
			<div className="quiz-questions">
				{questions.map((question, index) => (
					<Question
						key={index.toString()}
						question={question}
						questionIndex={index}
						questions={questions}
					/>
				))}
			</div>
			{!quizHistory && !displayResults ? <CheckButton /> : <QuizScore />}
		</div>
	);
}

export default Quiz;
