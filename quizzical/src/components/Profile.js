import React from "react";
import "../css/Profile.css";
import Avatar from "@mui/material/Avatar";
import { useState, useContext } from "react";
import { Context } from "../context/Context.js";
import { Popover, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Profile() {
	const { logout } = useContext(Context);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/");
		} catch {
			setError("Failed to logout");
		}
	}
	function handleProfileClick() {
		navigate("/me");
	}
	return (
		<div className="profile" onClick={handleProfileClick}>
			<Avatar className="profile-logo"></Avatar>
			<h3 className="profile-text">Me</h3>
		</div>
	);
}

export default Profile;
