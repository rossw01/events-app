import React, { useState } from "react";
import events from "../../events";
import Event from "./Event";
import "./EventsList.css";

const EventsList = (props) => {
	const [formValues, changeFormValues] = useState({
		// Make sure postId isn't getting double incremented
		name: "",
		description: "",
		location: "",
		date: "",
		time: "",
		image: "",
	});

	const handleChange = (event) => {
		let fieldValue = event.target.value;
		let fieldName = event.target.name;
		const newState = { ...formValues };

		newState[fieldName] = fieldValue;
		changeFormValues(newState);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		let result;
		if (formValues) {
			console.log("1");
			result = await props.client.addEvent(
				formValues.name,
				formValues.description,
				formValues.location,
				formValues.date,
				formValues.time,
				formValues.image
			);
		} else {
			result = undefined;
		}
		console.log(result);
		result
			.then(() => {
				buildEvents();
			})
			.catch(() => {
				alert("Error occured");
			});
	};

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

	return (
		<div className="fb-row">
			{buildEvents()}
			<form onSubmit={(event) => submitHandler(event)}>
				<label>
					name:
					<input
						type="text"
						name="name"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<label>
					description:
					<input
						type="text"
						name="description"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<label>
					location:
					<input
						type="text"
						name="location"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<label>
					date:
					<input
						type="text"
						name="date"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<label>
					time:
					<input
						type="text"
						name="time"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<label>
					image:
					<input
						type="text"
						name="image"
						onChange={(event) => handleChange(event)}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default EventsList;
