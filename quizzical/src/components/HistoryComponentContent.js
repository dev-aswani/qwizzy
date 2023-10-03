import React from "react";
import "../css/HistoryComponentContent.css";
import { QuestionMarkSharp } from "@mui/icons-material";
function HistoryComponentContent({ title, value, questions }) {
	return (
		<div className="history-component-content">
			<div className="history-component-content-title">{title}</div>
			<div className="history-component-content-value">
				{title === "Score" ? value + "/" + questions.length : value}
			</div>
		</div>
	);
}

export default HistoryComponentContent;
