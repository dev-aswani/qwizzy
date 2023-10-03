import React, { useContext } from "react";
import HistoryComponentContent from "./HistoryComponentContent";
import "../css/HistoryComponent.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
function HistoryComponent({
	category,
	score,
	difficulty,
	submittedAt,
	questions,
}) {
	const { setQuizHistoryQuestions, setQuizHistory } = useContext(Context);
	const navigate = useNavigate();
	function handleHistoryComponentClick() {
		setQuizHistoryQuestions({ questions, score });
		setQuizHistory(true);
		navigate("/quizHistory");
	}
	return (
		<div
			className="history-component"
			onClick={handleHistoryComponentClick}
		>
			<HistoryComponentContent
				title="Category"
				value={category}
				questions={questions}
			/>
			<HistoryComponentContent
				title="Difficulty"
				value={difficulty}
				questions={questions}
			/>
			<HistoryComponentContent
				title="Score"
				value={score}
				questions={questions}
			/>
			<HistoryComponentContent
				title="Submitted At"
				value={submittedAt}
				questions={questions}
			/>
		</div>
	);
}

export default HistoryComponent;
