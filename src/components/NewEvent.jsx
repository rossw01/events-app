/*
how i broke git repo
I commited changes to NewEvent.jsx
pulled to main

i noticed I'd not pulled changes to Header.jsx to main
I pulled

then did checkout main to make sure things were working

Local files were set to 1st commit, repo was set to 1st commit

I cloned newest branch, header was updated and NewEvent was updated (looked perfect on my end)

I created new issue to try fix everything and get main back to how it was on my local machine
Main remained same as 1st commit, and new branch remained same as first commit

didnt work
wtf am i doing lol

*/

import React, { useState } from "react";
import Event from "./EventsList/Event";
import "./NewEvent.css";

const NewEvent = (props) => {
	// I defined these here so we can set eventDetails with them when user backspaces their form input
	let defaultName = "Example Event Name";
	let defaultDescription =
		"This is a demonstration of how your event is going to look!";
	let defaultLocation = "Houses of Parliament, London";
	let defaultTime = "7:00 PM";
	let defaultDate = "Thu Nov 10 2032";
	let defaultImage =
		"https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?b=1&s=170667a&w=0&k=20&c=e-i4hdu7dT3PIuf4xQMglnnORiwBAC_ZUgXw6aorB1M=";

	const [eventDetails, setEventDetails] = useState({
		name: defaultName,
		description: defaultDescription,
		location: defaultLocation,
		time: defaultTime,
		date: defaultDate,
		image: defaultImage,
	});

	const dateFixer = (dateString) => {
		// Convert to local date format
		let newDate = new Date(Date.parse(dateString));
		let today = new Date();
		// Prevent date from being historical (based off epoch time values)
		if (newDate.setHours(0, 0, 0, 0) < today.getTime()) {
			newDate = today;
		}
		return newDate.toDateString();
	};

	const submitHandler = async (event) => {
		let username = (await props.client.getUserByToken(props.token)).data[0]
			.username;
		console.log(username);
		try {
			await props.client.addEvent(
				eventDetails.name,
				eventDetails.description,
				eventDetails.location,
				eventDetails.date,
				eventDetails.time,
				eventDetails.image,
				username
			);
			console.log("Event added successfully!");
			// TODO: Create Toastr notification
		} catch (e) {
			alert("Failed to create account.");
			console.log(e.message);
		}
	};

	const handleChange = (event) => {
		let fieldValue = event.target.value;
		let fieldName = event.target.name;

		if (fieldName === "date") {
			fieldValue = dateFixer(fieldValue);
		}
		const newState = { ...eventDetails };

		// When the user backspaces their input, reset to default value
		if (fieldValue === "") {
			switch (fieldName) {
				case "name":
					fieldValue = defaultName;
					break;
				case "description":
					fieldValue = defaultDescription;
					break;
				case "location":
					fieldValue = defaultLocation;
					break;
				case "time":
					fieldValue = defaultTime;
					break;
				case "date":
					fieldValue = defaultDate;
					break;
				case "image":
					fieldValue = defaultImage;
					break;
				default:
					fieldValue = "wtf";
			}
		}
		newState[fieldName] = fieldValue;
		setEventDetails(newState);
	};

	return (
		<div className="fb-row add-event">
			<div>
				<form className="fb-col add-event-form">
					<h2>Lets create your new event!</h2>
					<label>
						Event name:
						<input
							name="name"
							onChange={(event) => handleChange(event)}
						></input>
					</label>
					<label>
						Event Description:
						<textarea
							name="description"
							onChange={(event) => handleChange(event)}
						></textarea>
					</label>
					<label>
						Event Location:
						<input
							name="location"
							onChange={(event) => handleChange(event)}
						></input>
					</label>
					<label>
						Event time:
						<input
							name="time"
							onChange={(event) => handleChange(event)}
						></input>
					</label>
					<label>
						Event date:
						<input
							type="date"
							name="date"
							onChange={(event) => handleChange(event)}
						></input>
					</label>
					<label>
						Event image:
						<input
							type="url"
							name="image"
							onChange={(event) => handleChange(event)}
						></input>
					</label>
					<button type="submit" onClick={() => submitHandler()}>
						Submit
					</button>
				</form>
			</div>
			{/* Could try using a ternary to check if state is left blank */}
			<div className="fb-col">
				<h2>Event Preview:</h2>
				<Event
					name={eventDetails.name}
					description={eventDetails.description}
					location={eventDetails.location}
					time={eventDetails.time}
					date={eventDetails.date}
					image={eventDetails.image}
				/>
			</div>
		</div>
	);
};

export default NewEvent;
