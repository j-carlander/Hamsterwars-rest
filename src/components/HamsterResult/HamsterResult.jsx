import react from "react";
import "./HamsterResult.css";

export function HamsterResult(props) {
  return (
    <div className="hamster-card">
      <img
        src={`http://127.0.0.1:5000${props.img}`}
        alt=""
        className="hamster-card-image"
      />
      <p className="hamster-card-votes">{props.votes}</p>
    </div>
  );
}
