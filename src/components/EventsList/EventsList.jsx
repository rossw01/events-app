import React, { useEffect, useState } from "react";
import Event from "./Event";
import "./EventsList.css";

const EventsList = (props) => {
	//
	// console.log(props.client);
	// console.log(events);

	const [events, setEvents] = useState(undefined);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const callApi = async () => {
			const data = (await props.client.getEvents()).data;
			setEvents(data);
		};
		callApi();
	}, [props.client]);

	const buildEvents = () => {
		let existingEvents = events
			?.sort((a, b) =>
				new Date(Date.parse(a.date)).getTime() >
				new Date(Date.parse(b.date)).getTime()
					? 1
					: -1
			)
			.filter((event) => {
				return [event.name, event.location, event.date, event.description]
					.join(" ")
					.includes(search);
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
					/>
				);
			});
		return existingEvents;
	};

	return (
		<>
			<div className="fb-row">
				<form>
					<input
						onChange={(event) => setSearch(event.target.value)}
						className="big-searchbar"
					/>
				</form>
			</div>
			<div className="fb-row event-view">{buildEvents()}</div>
		</>
	);
};

export default EventsList;
