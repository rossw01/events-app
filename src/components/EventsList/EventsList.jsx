import React from "react";
import events from "../../events";
import Event from "./Event";
import "./EventsList.css";

const EventsList = () => {
	const buildEvents = () => {
		let existingEvents = events.map((event, i) => {
			return (
				<Event
					key={i}
					name={event.name}
					description={event.description}
					location={event.location}
					date={event.date}
					time={event.time}
					image={event.image}
					id={event._id}
				/>
			);
		});
		return existingEvents;
	};

	return <div className="fb-row">{buildEvents()}</div>;
};

export default EventsList;
