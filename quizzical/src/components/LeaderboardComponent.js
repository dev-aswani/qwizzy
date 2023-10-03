import React, { useContext } from "react";
import LeaderboardComponentContent from "./LeaderboardComponentContent";
import "../css/LeaderboardComponent.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { Avatar } from "@mui/material";
function LeaderboardComponent({ rank, id, matches, score }) {
	return (
		<div className="leaderboard-component">
			<LeaderboardComponentContent title="Rank" value={rank} />
			<LeaderboardComponentContent title="ID" value={id} />
			<LeaderboardComponentContent title="Matches" value={matches} />
			<LeaderboardComponentContent title="Score" value={score} />
		</div>
	);
}

export default LeaderboardComponent;
