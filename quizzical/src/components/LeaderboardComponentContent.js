import React from "react";
import "../css/LeaderboardComponentContent.css";
import { QuestionMarkSharp } from "@mui/icons-material";
function leaderboardComponentContent({ title, value, questions }) {
	return (
		<div className="leaderboard-component-content">
			<div className="leaderboard-component-content-title">{title}</div>
			<div className="leaderboard-component-content-value">{value}</div>
		</div>
	);
}

export default leaderboardComponentContent;
