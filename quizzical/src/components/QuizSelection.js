import React, { useEffect, useState, useRef, useContext } from "react";
import NavigationBar from "./NavigationBar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import "../css/QuizSelection.css";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import { Context } from "../context/Context.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Load from "../Load.js";
import { FormHelperText } from "@mui/material";
import he from "he";

function QuizSelection() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState(null);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		amount: 5,
		category: "",
		difficulty: "",
		type: "multiple",
	});
	const [error, setError] = useState({
		categoryError: "",
		difficultyError: "",
	});
	const {
		setQuizData,
		setDisplayResults,
		setQuizHistory,
		setQuizHistoryQuestions,
		setAllQuestions,
	} = useContext(Context);
	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}
	useEffect(() => {
		async function fetchCategories() {
			const response = await fetch(
				"https://opentdb.com/api_category.php"
			);
			const data = await response.json();
			setCategories(data.trivia_categories);
			setLoading(false);
		}
		fetchCategories();
	}, []);
	function handleSubmit(event) {
		validation();
		event.preventDefault();
		if (formData.category === "" || formData.difficulty === "") {
			return;
		}

		setLoading(true);
		let categoryId;
		for (let i = 0; i < categories.length; i++) {
			if (categories[i].name === formData.category) {
				categoryId = categories[i].id;
				break;
			}
		}
		fetch(
			`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${formData.difficulty}&type=multiple`
		)
			.then((res) => res.json())
			.then((data) => {
				let result = data.results.map((mcq) => {
					const index = Math.floor(Math.random() * 4);
					const options = mcq.incorrect_answers.map((answer) =>
						he.decode(answer)
					);
					options.splice(index, 0, he.decode(mcq.correct_answer));
					return {
						...mcq,
						question: he.decode(mcq.question),
						correct_answer: he.decode(mcq.correct_answer),
						incorrect_answers: options,
						options: options,
						correctAnswerIndex: index,
					};
				});
				setQuizData(result);
				setAllQuestions(null);
				setDisplayResults(null);
				setQuizHistory(false);
				setQuizHistoryQuestions(null);
				navigate("/quiz");
			});
	}
	function validateCategory() {
		if (formData.category === "") {
			return setError((prevState) => {
				return {
					...prevState,
					categoryError: "Please select the category",
				};
			});
		} else {
			return setError((prevState) => {
				return {
					...prevState,
					categoryError: "",
				};
			});
		}
	}
	function validateDifficulty() {
		if (formData.difficulty === "") {
			return setError((prevState) => {
				return {
					...prevState,
					difficultyError: "Please select the difficulty",
				};
			});
		} else {
			return setError((prevState) => {
				return {
					...prevState,
					difficultyError: "",
				};
			});
		}
	}
	function validation() {
		validateCategory();
		validateDifficulty();
	}
	return (
		<div className="quiz-selection-page">
			<NavigationBar />

			{!loading && categories ? (
				<form className="quiz-selection-form">
					<FormControl
						variant="filled"
						style={{ width: "100%" }}
						required
						error={error.categoryError !== ""}
					>
						<InputLabel id="category">Category</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="category"
							value={formData.category}
							label="category"
							onChange={handleChange}
							name="category"
						>
							{categories.map((category, index) => (
								<MenuItem value={category.name} key={index}>
									{category.name}
								</MenuItem>
							))}
						</Select>
						{error.categoryError !== "" && (
							<FormHelperText>
								{error.categoryError}
							</FormHelperText>
						)}
					</FormControl>
					<FormControl
						variant="filled"
						style={{ width: "100%" }}
						required
						error={error.difficultyError !== ""}
					>
						<InputLabel id="difficulty">Difficulty</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="category"
							value={formData.difficulty}
							label="difficulty"
							onChange={handleChange}
							name="difficulty"
						>
							<MenuItem value="easy">easy</MenuItem>
							<MenuItem value="medium">medium</MenuItem>
							<MenuItem value="hard">hard</MenuItem>
						</Select>
						{error.difficultyError !== "" && (
							<FormHelperText>
								{error.difficultyError}
							</FormHelperText>
						)}
					</FormControl>
					<Button
						variant="contained"
						onClick={handleSubmit}
						type="submit"
						disabled={loading}
						style={{ backgroundColor: "#4d5b9e" }}
					>
						Start Quiz
						<ArrowForwardIcon
							style={{ marginLeft: "5px" }}
						></ArrowForwardIcon>
					</Button>
				</form>
			) : (
				<Load />
			)}
		</div>
	);
}

export default QuizSelection;
