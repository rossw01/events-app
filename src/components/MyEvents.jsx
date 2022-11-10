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
	const [selectedDetails, setSelectedDetails] = useState({
		_id: "",
		name: "",
		description: "",
		location: "",
		time: "",
		date: "",
		image: "",
		username: "",
	});

	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		location: "",
		time: "",
		date: "",
		image: "",
	});

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
							setSelectedDetails({
								_id: event._id,
								name: event.name,
								description: event.description,
								location: event.location,
								date: event.date,
								time: event.time,
								image: event.image,
								username: event.username,
							});
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

	const checkFieldUpdated = (formValue, originalDetail) => {
		// Check to see if the user inputted anything in the form, if not, return original value of Event prop
		return formValue.length > 0 ? formValue : originalDetail;
	};

	const submitHandler = async () => {
		console.log(selectedDetails, formValues);
		console.log(username);
		//_id, name, description, location, time, date, image, user
		try {
			await props.client.updateEvent(
				selectedDetails._id,
				checkFieldUpdated(formValues.name, selectedDetails.name),
				checkFieldUpdated(formValues.description, selectedDetails.description),
				checkFieldUpdated(formValues.location, selectedDetails.location),
				checkFieldUpdated(formValues.time, selectedDetails.time),
				checkFieldUpdated(formValues.date, selectedDetails.date),
				checkFieldUpdated(formValues.image, selectedDetails.image),
				username
			);
			console.log("Updated Event successfully!");
			// TODO: Create Toastr notification
		} catch (e) {
			alert("Failed to update Event.");
			console.log(e.message);
		}
		return;
	};

	const handleChange = (event) => {
		let fieldValue = event.target.value;
		let fieldName = event.target.name;
		const newState = { ...formValues };
		newState[fieldName] = fieldValue;
		setFormValues(newState);
	};

	const deleteSelected = async () => {
		console.log(selectedDetails._id);
		await props.client.removeEvent(selectedDetails._id);
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
			<div className="fb-col">
				{/* Use same styles as NewEvent to save time */}
				<label>
					Name:
					<input
						type="text"
						name="name"
						onChange={(event) => handleChange(event)}
					></input>
				</label>
				<label>
					Description:
					<textarea
						type="text"
						name="description"
						onChange={(event) => handleChange(event)}
					></textarea>
				</label>
				<label>
					Location:
					<input
						type="text"
						name="location"
						onChange={(event) => handleChange(event)}
					></input>
				</label>
				<label>
					Date:
					<input
						type="date"
						name="date"
						onChange={(event) => handleChange(event)}
					></input>
				</label>
				<label>
					Time:
					<input
						type="text"
						name="time"
						onChange={(event) => handleChange(event)}
					></input>
				</label>
				<label>
					image:
					<input
						type="url"
						name="image"
						onChange={(event) => handleChange(event)}
					></input>
				</label>
				<button
					type="submit"
					style={{ width: "100px" }}
					onClick={() => submitHandler()}
					disabled={selected === undefined}
				>
					Submit
				</button>
			</div>
			<button
				disabled={selected === undefined}
				onClick={() => deleteSelected()}
			>
				Delete Event
			</button>
		</>
	);
};

export default MyEvents;
