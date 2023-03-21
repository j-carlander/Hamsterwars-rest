import React from "react";
import "./HamsterRadioBtn.css";

export default function HamsterRadioBtn(props) {
  return (
    <div className="hamster-radio-btn">
      <label htmlFor={props.name}>
        <img
          src={`http://127.0.0.1:5000${props.img}`}
          alt=""
          className="hamster-image"
        />
      </label>
      <input
        type="radio"
        name="votedOn"
        id={props.name}
        value={props.id}
        onChange={props.onChange}
      />
    </div>
  );
}
