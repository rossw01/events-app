import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigateTo = useNavigate();

	const checkForms = (forms) => {
		if (forms.username.length < 5) {
			alert("Your username must be at least 5 characters in length");
			return false;
		}
		// pw should be 6 chars minimum and contain a number
		if (forms.password.length < 6 || !/\d/.test(forms.password)) {
			alert(
				"Your password must be at least 6 characters in length and must contain a number"
			);
			return false;
		}
		return true;
	};

	const submitHandler = async () => {
		if (!checkForms({ username: username, password: password })) {
			return false;
		}
		try {
			await props.client.addUser(username, password);
			alert("Account created! You may now login");
			navigateTo("/login");
		} catch (e) {
			alert("That username you chose already exists exists already");
			console.log(e.message);
		}
	};

	return (
		<div className="fb-col centered">
			<h2 style={{ paddingBottom: "1rem" }}>Create a new account:</h2>
			<label>
				Username:<>&nbsp;</>
				<input
					type="text"
					name="username"
					onChange={(event) => setUsername(event.target.value)}
					className="big-searchbar"
				></input>
			</label>
			<label>
				Username:<>&nbsp;</>
				<input
					type="text"
					name="password"
					onChange={(event) => setPassword(event.target.value)}
					className="big-searchbar"
				></input>
			</label>
			<button
				type="submit"
				className="header-btn register"
				onClick={() => submitHandler()}
			>
				Submit
			</button>
		</div>
	);
};

export default Register;
