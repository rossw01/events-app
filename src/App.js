import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ApiClient } from "./apiClient";
import "./App.css";
import EventsList from "./components/EventsList/EventsList";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
	const [token, changeToken] = useState(window.localStorage.getItem("token"));
	const client = new ApiClient();

	const loggedIn = (token) => {
		window.localStorage.setItem("token", token);
		changeToken(token);
	};

	return (
		<Routes>
			{/* Home Page */}
			<Route
				path="/"
				element={
					<div className="App">
						<Header token={token} />
						<EventsList client={client} />
					</div>
				}
			></Route>
			{/* Login Page */}
			<Route
				path="/login"
				element={
					<>
						<Header />
						<Login client={client} loggedIn={(token) => loggedIn(token)} />
					</>
				}
			></Route>
		</Routes>
	);
}

export default App;
