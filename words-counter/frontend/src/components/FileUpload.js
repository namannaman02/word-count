import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = () => {
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
				// Handle the successful response from the backend
				console.log(response.data);
				counter = response.data;
				console.log(counter);
				setLoading(false);
				setShowCounter(counter);
			})

			.catch((error) => {
				// Handle the response error
				if (error.response) {
					// The request was made and the server responded with an error status
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
					// The request was made, but no response was received
					console.error(
						"Request Error:",
						error.request
					);
				} else {
					// Something happened in setting up the request that triggered an Error
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
							<p className="file-upload-output">
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
