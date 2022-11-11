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
			console.log(loginDetails);
			const res = await props.client.login(
				loginDetails.username,
				loginDetails.password
			);
			// alert("Successfimage.pngul login");
			props.loggedIn(res.data.token);
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
			<form
				onSubmit={(event) => submitHandler(event)}
				className="fb-col centered"
				style={{ height: "auto" }}
			>
				<h2 style={{ paddingBottom: "1rem" }}>Login to your account:</h2>
				<label>
					Username:<>&nbsp;</>
					<input
						type="text"
						name="username"
						className="big-searchbar"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<label>
					Password:<>&nbsp;</>
					<input
						type="password"
						name="password"
						className="big-searchbar"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<button type="submit" className="header-btn profile">
					Log in
				</button>
			</form>
		</div>
	);
};

export default Login;
