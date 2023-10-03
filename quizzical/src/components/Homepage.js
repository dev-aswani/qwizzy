import React, { useState } from "react";
import "../css/Homepage.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
const CustomContainedButton = styled(Button)({
	backgroundColor: "#4d5b9e",
	width: "200px",
	transitionProperty: "all",
	transitionDuration: "0.3s",
	"&:hover": {
		boxShadow: "rgba(31, 35, 65, 0.37) 0px 20px 30px -11px",
		transform: "translate(0px, -5px) ",
		backgroundColor: "#4d5b9e!important",
	},
});

const CustomOutlinedButton = styled(Button)(({ theme }) => ({
	borderColor: "#4d5b9e",
	color: "#4d5b9e",
	width: "200px",
	transitionProperty: "all",
	transitionDuration: "0.3s",
	"&:hover": {
		boxShadow: "rgba(31, 35, 65, 0.37) 0px 20px 30px -11px",
		transform: "translate(0px, -5px) ",
		borderColor: "#4d5b9e!important",
	},
}));

function Homepage() {
	return (
		<div className="homepage">
			<div className="homepage-main">
				<div className="homepage-main-title">Qwizzy</div>
				<div className="homepage-main-description">
					Welcome to Qwizzy, a place where learning meets adventure.
					Are you ready to make a deep dive into a fun filled
					experience? Join us here at Qwizzy.
				</div>
				<div className="homepage-buttons">
					<Link to="/signup">
						<CustomOutlinedButton variant="outlined">
							Signup
						</CustomOutlinedButton>
					</Link>
					<Link to="/login">
						<CustomContainedButton variant="contained">
							Login
						</CustomContainedButton>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
