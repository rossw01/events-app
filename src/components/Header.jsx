import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
	return (
		<div className="header">
			<a>
				<img
					className="header-logo"
					src={require("./event-it-logo.png")}
					alt={"event it logo"}
				/>
			</a>
			{props.token ? (
				<div className="buttons">
					<Link to="/profile">
						<button className="register-btn">My Profile</button>
					</Link>
					<Link to="/logout">
						<button className="register-btn">Log out</button>
					</Link>
				</div>
			) : (
				<div className="buttons">
					<Link to="/login">
						<button className="login-btn">Login</button>
					</Link>
					<button className="register-btn ">Register</button>
				</div>
			)}
		</div>
	);
};

export default Header;
