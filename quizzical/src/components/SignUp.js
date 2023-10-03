import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../css/SignUp.css";
import { Context } from "../context/Context.js";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import { prettyFormat } from "@testing-library/react";

function SignUp() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState({
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
		unknownError: "",
	});
	const [loading, setLoading] = useState(false);
	const { signup, signInMethods } = useContext(Context);
	const [open, setOpen] = useState(false);
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
	function validatePassword() {
		if (formData.password === "") {
			return setError((prevState) => {
				return {
					...prevState,
					passwordError: "Please enter a password",
				};
			});
		} else if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
				formData.password
			)
		) {
			return setError((prevState) => {
				return {
					...prevState,
					passwordError:
						"Password must contain at least 8 characters, including uppercase, lowercase, numeric, and special characters",
				};
			});
		} else {
			return setError((prevState) => {
				return {
					...prevState,
					passwordError: "",
				};
			});
		}
	}
	function validateConfirmPassword() {
		if (formData.confirmPassword === "") {
			return setError((prevState) => {
				return {
					...prevState,
					confirmPasswordError: "Please enter the password again",
				};
			});
		} else if (formData.confirmPassword !== formData.password) {
			return setError((prevState) => {
				return {
					...prevState,
					confirmPasswordError: "Passwords do not match",
				};
			});
		} else {
			return setError((prevState) => {
				return {
					...prevState,
					confirmPasswordError: "",
				};
			});
		}
	}
	function validation() {
		validateEmail();
		validatePassword();
		validateConfirmPassword();
	}
	async function handleSubmit(event) {
		event.preventDefault();
		validation();
		if (
			formData.email === "" ||
			!/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(formData.email) ||
			formData.password === "" ||
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
				formData.password
			) ||
			formData.confirmPassword === "" ||
			formData.confirmPassword !== formData.password
		) {
			return;
		}
		const account = await signInMethods(formData.email);
		if (account.length > 0) {
			return setError((prevState) => {
				return {
					...prevState,
					emailError:
						"An account with this email address already exists ",
				};
			});
		}
		try {
			setLoading(true);
			await signup(formData.email, formData.password);
			setOpen(true);
		} catch (error) {
			setError((prevState) => {
				return {
					...prevState,
					unknownError:
						"Unkown error occurred, failed to create an account",
				};
			});
		}
		setLoading(false);
	}
	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => {
			return { ...prevState, [name]: value };
		});
	}
	return (
		<div className="signup-page">
			<form className="signup-form">
				<h1 style={{ marginTop: "0px" }}>SignUp</h1>
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
						>
							Account created successfully{" "}
							<Link
								to="/login"
								style={{
									color: "inherit",
									fontSize: "inherit",
								}}
							>
								Proceed to Login
							</Link>
						</Alert>
					</Fade>
				)}

				<TextField
					className="signup-email"
					label="Email"
					variant="outlined"
					placeholder="email@domain.com"
					value={formData.email}
					onChange={handleChange}
					name="email"
					error={error.emailError !== ""}
					helperText={error.emailError}
				></TextField>
				<TextField
					className="signup-password"
					label="Password"
					variant="outlined"
					placeholder="********"
					value={formData.password}
					onChange={handleChange}
					type="password"
					name="password"
					error={error.passwordError !== ""}
					helperText={error.passwordError}
				></TextField>
				<TextField
					className="signup-confirm-password"
					label="Confirm Password"
					variant="outlined"
					placeholder="********"
					value={formData.confirmPassword}
					name="confirmPassword"
					onChange={handleChange}
					type="password"
					error={error.confirmPasswordError !== ""}
					helperText={error.confirmPasswordError}
				></TextField>
				<Button
					disabled={loading}
					variant="contained"
					onClick={handleSubmit}
					type="submit"
					style={{ backgroundColor: "#4d5b9e" }}
				>
					SignUp
				</Button>
				<Link to="/login" className="login-link">
					<p>Already have an account? Login here</p>
				</Link>
			</form>
		</div>
	);
}
export default SignUp;
