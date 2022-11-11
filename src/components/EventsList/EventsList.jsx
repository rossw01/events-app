import React, { useEffect, useState } from "react";
import Event from "./Event";
import "./EventsList.css";

const EventsList = (props) => {
	const [events, setEvents] = useState(undefined);
	const [search, setSearch] = useState("");

	// It gets all the events when the page loads for the first time
	// stores them all in state
	useEffect(() => {
		// useEffect function runs when the client is loaded for the first time
		// when the apiCLient is created
		const callApi = async () => {
			// send a request to get all events
			const data = (await props.client.getEvents()).data;
			// store the response in state(events)
			setEvents(data);
		};
		//
		callApi();
		//
	}, [props.client]);

	const buildEvents = () => {
		// generate the html elements
		// if there are events
		let existingEvents = events
			// sort by date
			?.sort((a, b) =>
				new Date(Date.parse(a.date)).getTime() >
				new Date(Date.parse(b.date)).getTime()
					? 1
					: -1
			)
			.filter((event) => {
				// filter out posts that do not have the search term anywhere in this
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
						username={event.username}
						id={event._id}
					/>
				);
			});
		return existingEvents;
	};

	return (
		<>
			<div className="fb-row">
				<input
					// puts the user input into search field into state
					onChange={(event) => setSearch(event.target.value)}
					className="big-searchbar"
				/>
			</div>
			<div className="fb-row event-view" style={{ marginTop: "1rem" }}>
				{/* calls the function that generates all of our cards from the map */}
				{buildEvents()}
			</div>
		</>
	);
};

export default EventsList;
