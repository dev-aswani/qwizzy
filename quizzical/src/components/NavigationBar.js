import React, { useState, useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Profile from "./Profile.js";
import "../css/NavigationBar.css";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HistoryIcon from "@mui/icons-material/History";
import NavigationBarOption from "./NavigationBarOption.js";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context.js";

function NavigationBar() {
	const { logout } = useContext(Context);
	const navigate = useNavigate();
	const [error, setError] = useState("");
	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/");
		} catch {
			setError("Failed to logout");
		}
	}
	function handleHomeClick() {
		navigate("/quizSelection");
	}
	function handleHistoryClick() {
		navigate("/history");
	}
	function handleLeaderboardClick() {
		navigate("/leaderboard");
	}
	return (
		<div className="navbar">
			<AppBar
				sx={{
					backgroundColor: "#4d5b9e",
					display: "flex",
					"& .MuiToolbar-root": {
						// justifyContent: "space-between",
						alignItems: "center",
					},
				}}
			>
				<Toolbar>
					<div className="home" onClick={handleHomeClick}>
						<NavigationBarOption
							Icon={HomeIcon}
							title="Home"
							className="home"
						/>
					</div>
					<h1 className="navigationbar-title">Qwizzy</h1>
					<div
						style={{ marginLeft: "auto" }}
						className="leaderboard"
						onClick={handleLeaderboardClick}
					>
						<NavigationBarOption
							Icon={LeaderboardIcon}
							title="Leaderboard"
						/>
					</div>
					<div className="history" onClick={handleHistoryClick}>
						<NavigationBarOption
							Icon={HistoryIcon}
							title="History"
						/>
					</div>
					<div className="history" onClick={handleLogout}>
						<NavigationBarOption
							Icon={PowerSettingsNewIcon}
							title="Logout"
						/>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default NavigationBar;
