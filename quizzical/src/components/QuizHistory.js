import React, { useContext } from "react";
import Quiz from "./Quiz.js";
import { Context } from "../context/Context.js";
function QuizHistory() {
	const { quizHistoryQuestions } = useContext(Context);
	return (
		<div className="quiz-history">
			<Quiz questions={quizHistoryQuestions?.questions || []} />
		</div>
	);
}

export default QuizHistory;
