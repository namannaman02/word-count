import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = (props) => {
	let counter = {};
	const [
		selectedFile,
		setSelectedFile,
	] = useState(null);
	const [loading, setLoading] =
		useState(false);
	const [showCounter, setShowCounter] =
		useState(null);

	const handleFileChange = (event) => {
		setSelectedFile(
			event.target.files[0]
		);
	};

	const handleLogout = () => {
		props.onLogout(false);
	};

	const handleFileUpload = () => {
		setLoading(true);
		const formData = new FormData();
		formData.append(
			"file",
			selectedFile
		);

		axios
			.post("/api/upload", formData)
			.then((response) => {
				counter = response.data;
				setLoading(false);
				setShowCounter(counter);
			})

			.catch((error) => {
				if (error.response) {
					console.error(
						"Response Error:",
						error.response.data
					);
					console.error(
						"Response Status:",
						error.response.status
					);
					console.error(
						"Response Headers:",
						error.response.headers
					);
				} else if (error.request) {
					console.error(
						"Request Error:",
						error.request
					);
				} else {
					console.error(
						"Error:",
						error.message
					);
				}

				setLoading(false);
			});
	};

	return (
		<div className="file-upload-container">
			<div className="container-logout-button">
				<button
					className="logout-button"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>

			<input
				className="file-upload-input"
				type="file"
				onChange={handleFileChange}
			/>

			<button
				className="file-upload-button"
				onClick={handleFileUpload}
				disabled={
					!selectedFile || loading
				}
			>
				Upload File
			</button>
			{loading && <p>Loading...</p>}
			{showCounter && (
				<div>
					{Object.keys(showCounter).map(
						(key) => (
							<p
								className="file-upload-output"
								key={key}
							>
								{key} :{" "}
								{showCounter[key]}
							</p>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default FileUpload;
