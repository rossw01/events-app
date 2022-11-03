import React from "react";
import "./Event.css";

const Event = (props) => {
	return (
		<div className="card">
			<img width="100%" src={props.image} alt={props.name} />
			{[
				props.name,
				props.location,
				props.description,
				props.date,
				props.time,
				props.id,
			].join(" - ")}
		</div>
	);
};

export default Event;
