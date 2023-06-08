import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import LoginPage from "./components/LoginPage";
import "./App.css";

const App = () => {
	const [login, setLogin] =
		useState(false);

	const updateLogin = (status) => {
		setLogin(status);
	};
	return (
		<div className="App">
			{!login && (
				<LoginPage
					updateLogin={updateLogin}
				/>
			)}
			{login && (
				<div>
					<h1>File Upload</h1>
					<FileUpload
						onLogout={updateLogin}
					/>
				</div>
			)}
		</div>
	);
};

export default App;
