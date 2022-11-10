import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
	const [loginDetails, setLoginDetails] = useState({
		username: undefined,
		password: undefined,
	});

	const navigateTo = useNavigate();

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const res = await props.client.login(
				loginDetails.username,
				loginDetails.password
			);
			// alert("Successfimage.pngul login");
			props.loggedIn(res.data.token);
			alert("Correct Login");
			navigateTo("/");

			// let history = useHistory();
			// history.push("/");

			// return <Navigate to="/" />;
			// TODO: return the token to props.loggedIn
		} catch (error) {
			alert("Incorrect details");
			console.log(error.message);
		}
	};

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
			<form onSubmit={(event) => submitHandler(event)}>
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
				<button type="submit">Log in</button>
			</form>
		</div>
	);
};

export default Login;
