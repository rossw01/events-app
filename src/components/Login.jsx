import React, { useState } from "react";

const Login = (props) => {
	const [loginDetails, setLoginDetails] = useState({
		username: "",
		password: "",
	});

	// const submitHandler = (event) => {
	// 	event.preventDefault();
	//     let result;
	//     if (loginDetails) {
	// 		result = props.client.addEvent(
	// 			formValues.name,
	// 			formValues.description,
	// 			formValues.location,
	// 			formValues.date,
	// 			formValues.time,
	// 			formValues.image
	// 		);
	// 	} else {
	// 		result = undefined;
	// 	}
	// };

	// Handles input fields being changed, then updates loginDetails state with setLoginDetails
	const handleChange = (event) => {
		let fieldValue = event.target.value;
		let fieldName = event.target.name;

		const newState = { ...loginDetails };

		newState[fieldName] = fieldValue;
		setLoginDetails(newState);
	};

	return (
		<div>
			{/* <form onSubmit={(event) => submitHandler(event)}> */}
			<form>
				<label>
					Username:
					<input
						type="text"
						name="username"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<label>
					Password:
					<input
						type="text"
						name="password"
						onChange={(event) => handleChange(event)}
					/>
				</label>
			</form>
		</div>
	);
};

export default Login;
