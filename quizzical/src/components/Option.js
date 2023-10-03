import React, { useEffect, useState, useContext } from "react";
import "../css/Option.css";
import { Context } from "../context/Context";
import { Button } from "@mui/material";

function Option({
	value,
	optionIndex,
	selectedOptionIndex,
	handleSelectOption,
	correctAnswerIndex,
	questions,
	questionIndex,
}) {
	const [isSelected, setIsSelected] = useState(null);
	const [isCorrect, setIsCorrect] = useState(null);
	const { quizHistory } = useContext(Context);
	useEffect(() => {
		if (selectedOptionIndex !== null) {
			if (selectedOptionIndex === optionIndex) setIsSelected(true);
			else setIsSelected(false);
		}
	}, [selectedOptionIndex]);

	useEffect(() => {
		if (correctAnswerIndex !== null) {
			if (correctAnswerIndex === optionIndex) {
				setIsCorrect(true);
			} else {
				setIsCorrect(false);
			}
		}
	}, [correctAnswerIndex]);

	//on tap of button
	//* if the selected option is correct, make green
	//* if selected option is incorrect, make red
	//* if not selected but correct, make green
	//* if not selected but wrong, make disabled
	//* if not in check answer mode, and not selected give regular unselected style
	//* if not in check answer  mode and selected, give selected style

	return (
		<Button
			variant="outlined"
			className={
				!quizHistory
					? isCorrect === null && isSelected === null
						? "question-option"
						: isCorrect === null && isSelected
						? "question-option selected"
						: isSelected === false && isCorrect === false
						? "question-option disabled"
						: isSelected === false && isCorrect === true
						? "question-option  correct"
						: isSelected === true && isCorrect === false
						? "question-option selected disabled incorrect"
						: isSelected === true && isCorrect === true
						? "question-option selected correct"
						: !isSelected && isCorrect === true
						? "question-option selected correct"
						: isSelected === null && isCorrect === false
						? "question-option disabled"
						: "question-option"
					: questions[questionIndex].selectedOptionIndex ===
					  optionIndex
					? questions[questionIndex].answeredCorrectly === true
						? "question-option selected correct"
						: "question-option selected disabled incorrect"
					: questions[questionIndex].correctAnswerIndex ===
					  optionIndex
					? "question-option correct"
					: "question-option disabled"
			}
			onClick={() => handleSelectOption(optionIndex)}
		>
			{value}
		</Button>
	);
}

export default Option;
