import React from "react";
import { FaDoorOpen, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
	const logout = (changeToken) => {
		window.localStorage.removeItem("token");
		changeToken(undefined);
		// TODO: Nav back to root page
	};

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
					<Link to="/my-events" className="no-td">
						<button className="header-btn profile">
							<FaUser />
							<span className="header-button-text">My Profile</span>
						</button>
					</Link>
					<Link className="no-td">
						<button
							className="header-btn logout"
							onClick={() => logout(props.changeToken)}
						>
							<FaDoorOpen />
							Log out
						</button>
					</Link>
				</div>
			) : (
				<div className="buttons">
					<Link to="/login" className="no-td">
						<button className="header-btn profile">Login</button>
					</Link>
					<Link to="/register" className="no-td">
						<button className="header-btn register">Register</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Header;
