import React, { useEffect, useState } from "react";
import Event from "./EventsList/Event";
import "./EventsList/EventsList.css";

const MyEvents = (props) => {
	//
	// console.log(props.client);
	// console.log(events);

	const [events, setEvents] = useState(undefined);
	const [username, setUsername] = useState(undefined);
	const [selected, setSelected] = useState(undefined);

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
					<div
						key={i}
						onClick={() => {
							setSelected(i);
							console.log(i, selected, i === selected);
						}}
						className={`${i === selected ? "card-selected" : ""}`}
					>
						<Event
							key={i}
							name={event.name}
							description={event.description}
							location={event.location}
							date={event.date}
							time={event.time}
							image={event.image}
							id={event._id}
							isSelected={i === selected}
							username={event.username}
						/>
					</div>
				);
			});
		// TODO: can we return something else if length of existingEvents is 0?
		return existingEvents;
	};

	return (
		<>
			<h2>My Events:</h2>
			<div className="fb-row event-view">
				{/* {buildEvents() > 0 ? (
					buildEvents()
				) : (
					<h2>
						🥲 Nothing to see here yet - Consider creating your own event!
					</h2>
				)} */}
				{buildEvents()}
			</div>
		</>
	);
};

export default MyEvents;
