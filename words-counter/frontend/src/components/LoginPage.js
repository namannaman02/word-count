import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage(props) {
	const [username, setUsername] =
		useState("");
	const [password, setPassword] =
		useState("");

	const handleUsernameChange = (
		event
	) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (
		event
	) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Perform login logic here
		console.log("Username:", username);
		console.log("Password:", password);
		props.updateLogin(true);
		setUsername("");
		setPassword("");
	};

	return (
		<div className="container">
			<h2>Welcome</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={
						handleUsernameChange
					}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={
						handlePasswordChange
					}
				/>
				<input
					type="submit"
					value="Login"
				/>
			</form>
		</div>
	);
}

export default LoginPage;
