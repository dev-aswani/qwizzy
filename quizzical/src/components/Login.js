import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context.js";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		emailError: "",
		passwordError: "",
		unknownError: "",
	});
	const { login, signInMethods } = useContext(Context);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
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
		} else {
			return setError((prevState) => {
				return {
					...prevState,
					passwordError: "",
				};
			});
		}
	}
	function validation() {
		validateEmail();
		validatePassword();
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
		validation();
		if (
			formData.email === "" ||
			!/^[a-zA-Z].*@[a-z]+\.[a-z]{2,3}$/.test(formData.email) ||
			formData.password === ""
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
			await login(formData.email, formData.password);
			navigate("/quizSelection");
		} catch (error) {
			if (error.code === "auth/wrong-password") {
				setError((prevState) => {
					return {
						...prevState,
						passwordError: "Incorrect Password",
					};
				});
			} else {
				setError((prevState) => {
					return {
						...prevState,
						unknownError: "Unkown error occurred, failed to login",
					};
				});
				setOpen(true);
			}
		}
		setLoading(false);
	}
	return (
		<div className="login-page">
			<form className="login-form">
				<h1>Login</h1>
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
				<TextField
					className="login-email"
					label="Email"
					variant="outlined"
					placeholder="email@domain.com"
					name="email"
					value={formData.email}
					onChange={handleChange}
					error={error.emailError !== ""}
					helperText={error.emailError}
				></TextField>
				<TextField
					className="login-password"
					label="Password"
					variant="outlined"
					placeholder="********"
					name="password"
					value={formData.password}
					onChange={handleChange}
					type="password"
					error={error.passwordError !== ""}
					helperText={error.passwordError}
				></TextField>
				<Button
					variant="contained"
					onClick={handleSubmit}
					type="submit"
					disabled={loading}
					style={{ backgroundColor: "#4d5b9e" }}
				>
					Login
				</Button>
				<Link to="/signup" className="signup-link">
					<p>Don't have an account? Sign Up here</p>
				</Link>
				<Link to="/resetPassword" className="reset-password-link">
					<p>Forgot your password? Reset password</p>
				</Link>
			</form>
		</div>
	);
}

export default Login;
