import React, { useContext, useState } from "react";
import "../css/Quiz.css";
import { Context } from "../context/Context.js";
import "../css/CheckButton.css";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";

function CheckButton() {
	const { displayResults, setDisplayResults, quizHistory, allQuestions } =
		useContext(Context);
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		if (!allQuestions || allQuestions.length !== 5) {
			setOpen(true);
		} else {
			setDisplayResults(true);
			setOpen(false);
		}
	};

	return (
		<>
			{open && (
				<Fade in={open}>
					<Alert
						action={
							<IconButton
								onClick={() => {
									setOpen(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						severity="error"
						style={{ marginBottom: "30px" }}
					>
						Please answer all the questions
					</Alert>
				</Fade>
			)}
			<Button
				id="submit-button"
				onClick={handleClick}
				variant="contained"
			>
				Check Answers
			</Button>
		</>
	);
}

export default CheckButton;
