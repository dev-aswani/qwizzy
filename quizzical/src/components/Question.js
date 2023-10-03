import React, { useContext, useEffect, useState } from "react";
import Option from "./Option.js";
import { nanoid } from "nanoid";
import "../css/Question.css";
import { Context } from "../context/Context.js";
import { cloneDeep } from "lodash";
function Question({ question, questionIndex, questions }) {
	const { displayResults, allQuestions, setAllQuestions, quizHistory } =
		useContext(Context);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
	const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
	const handleSelectOption = (index) => {
		setSelectedOptionIndex(index);
	};

	useEffect(() => {
		if (displayResults) {
			setCorrectAnswerIndex(question.correctAnswerIndex);
		}
	}, [displayResults]);

	useEffect(() => {
		if (selectedOptionIndex !== null) {
			const currentAllQuestions = allQuestions
				? cloneDeep(allQuestions)
				: [];
			currentAllQuestions[questionIndex] = {
				...question,
				selectedOptionIndex,
				answeredCorrectly:
					selectedOptionIndex === question.correctAnswerIndex
						? true
						: false,
			};
			setAllQuestions(currentAllQuestions);
		}
	}, [selectedOptionIndex]);

	return (
		<div className="question">
			<div className="question-question">{question.question}</div>
			<div className="question-options">
				{question.options.map((option, index) => {
					return (
						<Option
							key={nanoid()}
							value={option}
							optionIndex={index}
							selectedOptionIndex={selectedOptionIndex}
							handleSelectOption={handleSelectOption}
							correctAnswerIndex={correctAnswerIndex}
							questions={questions}
							questionIndex={questionIndex}
						/>
					);
				})}
			</div>
		</div>
	);
}
export default Question;
