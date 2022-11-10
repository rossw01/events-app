import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ApiClient } from "./apiClient";
import "./App.css";
import EventsList from "./components/EventsList/EventsList";
import Header from "./components/Header";
import Login from "./components/Login";
import MyEvents from "./components/MyEvents";
import NewEvent from "./components/NewEvent";
import Register from "./components/Register";

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
						<Header changeToken={changeToken} token={token} />
						<h1
							style={{
								display: "flex",
								justifyContent: "center",
								margin: "0 1rem 2rem 1rem",
							}}
						>
							🎊 Upcoming Events:
						</h1>
						<EventsList client={client} token={token} />
					</div>
				}
			/>
			{/* Login Page */}
			<Route
				path="/login"
				element={
					<>
						<Header changeToken={changeToken} token={token} />
						<Login client={client} loggedIn={(token) => loggedIn(token)} />
					</>
				}
			/>
			<Route
				path="/new"
				element={
					<>
						<Header changeToken={changeToken} token={token} />
						<NewEvent client={client} token={token} />
					</>
				}
			/>
			<Route
				path="/my-events"
				element={
					<>
						<Header changeToken={changeToken} token={token} />
						<MyEvents client={client} token={token} />
					</>
				}
			/>
			<Route
				path="/register"
				element={
					<>
						<Header changeToken={changeToken} token={token} />
						<Register client={client} />
					</>
				}
			/>
		</Routes>
	);
}

export default App;
