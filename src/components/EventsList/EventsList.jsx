import axios from "axios";
import React, { useEffect, useState } from "react";
import Event from "./Event";
import "./EventsList.css";

const EventsList = (props) => {
	//
	// console.log(props.client);
	// console.log(events);

	const [events, setEvents] = useState(undefined);

	useEffect(() => {
		const callApi = async () => {
			const data = (await props.client.getEvents()).data;
			setEvents(data);
		};
		callApi();
	}, [props.client]);

	const buildEvents = () => {
		console.log(events);
		let existingEvents = events
			?.sort((a, b) =>
				new Date(Date.parse(a.date)).getTime() >
				new Date(Date.parse(b.date)).getTime()
					? 1
					: -1
			)
			.map((event, i) => {
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

	return (
		<>
			<h1 className="title">🎊 Upcoming Events:</h1>
			<div className="fb-row event-view">{buildEvents()}</div>
		</>
	);
};

export default EventsList;
