import React from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import "./Event.css";

const Event = (props) => {
	return (
		<div className={`card ${props.isSelected ? "selected" : ""}`}>
			<img className="card-img" src={props.image} alt={props.name} />
			<h3 className="card-name">{props.name}</h3>
			<p>{props.description}</p>

			{/*bottom date/location tags*/}
			<div className="card-info">
				<div className="card-info-item">
					<FaMapMarkerAlt className="card-info-icon" />
					<span className="card-info-text">{props.location}</span>
				</div>
				<div className="card-info-item">
					<FaClock className="card-info-icon" />
					<span className="card-info-text">{props.time}</span>
				</div>
				<div className="card-info-item">
					<FaCalendarAlt className="card-info-icon" />
					<span className="card-info-text">{props.date}</span>
				</div>
			</div>
		</div>
	);
};

export default Event;
