import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	return (
		<div className="header">
			<a>
				<img
					className="header-logo"
					src={require("./event-it-logo.png")}
					alt={"event it logo"}
				/>
			</a>
			<div>
				<Link to="/login">
					<button className="login-btn">Login</button>
				</Link>
				<button className="register-btn ">Register</button>
			</div>
		</div>
	);
};

export default Header;
