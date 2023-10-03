import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/ResetPassword.css";
import { Context } from "../context/Context.js";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import { Link, useNavigate } from "react-router-dom";
function ResetPassword() {
	const [formData, setFormData] = useState({
		email: "",
	});
	const [error, setError] = useState({
		emailError: "",
		unknownError: "",
	});
	const { resetPassword, signInMethods } = useContext(Context);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [messageOpen, setMessageOpen] = useState(false);
	function validateEmail() {
		if (formData.email === "") {
			return setError((prevState) => {
				return {
					...prevState,
					emailError: "Please enter an email address",
				};
			});
		} else if (!/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(formData.email)) {
			return setError((prevState) => {
				return {
					...prevState,
					emailError: "Please enter a valid email address",
				};
			});
		} else {
			return setError((prevState) => {
				return { ...prevState, emailError: "" };
			});
		}
	}
	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	}
	async function handleSubmit(event) {
		event.preventDefault();
		validateEmail();
		if (
			formData.email === "" ||
			!/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(formData.email)
		) {
			return;
		}
		const account = await signInMethods(formData.email);
		if (account.length === 0) {
			return setError((prevState) => {
				return {
					...prevState,
					emailError:
						"An account with this email address doesn't exist ",
				};
			});
		}
		try {
			setLoading(true);
			await resetPassword(formData.email);
			setMessage("Check your inbox for further instructions");
			setMessageOpen(true);
		} catch (error) {
			setError((prevState) => {
				return {
					...prevState,
					unknownError: "Unkown error occurred, failed to login",
				};
			});
			setOpen(true);
		}
		setLoading(false);
	}
	return (
		<div className="reset-password-page">
			<form className="reset-password-form">
				<h1>Password Reset</h1>
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
						>
							Unkown error occurred, failed to login
						</Alert>
					</Fade>
				)}
				{messageOpen && (
					<Fade in={messageOpen}>
						<Alert
							action={
								<IconButton
									onClick={() => {
										setMessageOpen(false);
									}}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							severity="success"
						>
							{message}
						</Alert>
					</Fade>
				)}

				<TextField
					className="reset-password-email"
					label="Email"
					variant="outlined"
					placeholder="email@domain.com"
					name="email"
					value={formData.email}
					onChange={handleChange}
					error={error.emailError !== ""}
					helperText={error.emailError}
				></TextField>
				<Button
					variant="contained"
					onClick={handleSubmit}
					type="submit"
					disabled={loading}
					style={{ backgroundColor: "#4d5b9e" }}
				>
					Reset Password
				</Button>
				<Link to="/signup" className="signup-link">
					<p>Don't have an account? Sign Up here</p>
				</Link>
				<Link to="/login" className="login-link">
					<p>Login</p>
				</Link>
			</form>
		</div>
	);
}

export default ResetPassword;
