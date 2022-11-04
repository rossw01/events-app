import React from "react";
import "./Event.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const Event = (props) => {
  return (
    <div className="card">
      <img className="card-el img" src={props.image} alt={props.name} />
      <h3 className="card-el name">{props.name}</h3>
      <p className="card-el date">
        <span>{props.date}</span>
        <span> </span>
        <span>{props.time}</span>
      </p>
      <p className="card-el text">{props.description}</p>
      <div className="card-el location">
        <FaMapMarkerAlt className="icon-location" />
        <span className="card-location">{props.location}</span>
      </div>
    </div>
  );
};

export default Event;
