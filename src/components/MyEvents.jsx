import React, { useEffect, useState } from "react";
import Event from "./EventsList/Event";
import "./EventsList/EventsList.css";

const MyEvents = (props) => {
	//
	// console.log(props.client);
	// console.log(events);

	const [events, setEvents] = useState(undefined);
	const [username, setUsername] = useState(undefined);

	useEffect(() => {
		const callApi = async () => {
			const data = (await props.client.getEvents()).data;
			setEvents(data);
			const username = (await props.client.getUserByToken(props.token)).data[0]
				.username;
			setUsername(username);
		};
		callApi();
	}, [props.client, props.token]);

	const buildEvents = () => {
		console.log(username);
		let existingEvents = events
			?.sort((a, b) =>
				new Date(Date.parse(a.date)).getTime() >
				new Date(Date.parse(b.date)).getTime()
					? 1
					: -1
			)
			.filter((event) => {
				return event.username === username;
			})
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
						username={event.username}
					/>
				);
			});
		return existingEvents;
	};

	return (
		<>
			<div className="fb-row event-view">{buildEvents()}</div>
		</>
	);
};

export default MyEvents;
