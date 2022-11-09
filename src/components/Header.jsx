import React from "react";
import { FaDoorOpen, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
	return (
		<div className="header">
			<Link to="/">
				<img
					className="header-logo"
					src={require("./event-it-logo.png")}
					alt={"event it logo"}
				/>
			</Link>
			{props.token ? (
				<div className="buttons">
					<Link to="/new" className="no-td">
						<button className="header-btn new">
							<span className="spin1">🥳</span>
							<span className="header-button-text">New Event</span>
						</button>
					</Link>
					<Link to="/profile" className="no-td">
						<button className="header-btn profile">
							<FaUser />
							<span className="header-button-text">My Profile</span>
						</button>
					</Link>
					<Link to="/logout" className="no-td">
						<button className="header-btn logout">
							<FaDoorOpen />
							Log out
						</button>
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
