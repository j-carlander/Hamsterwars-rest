import React from "react";
import { useEffect, useState } from "react";
import HamsterRadioBtn from "../components/HamsterRadioBtn/HamsterRadioBtn";
import "./Vote.css";
import { fetchHamsters } from "../components/fetchHamsters/fetchHamsters";

function Vote() {
  const [hamsters, setHamsters] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [votedOn, setVotedOn] = useState();

  useEffect(() => {
    fetchHamsters(setHamsters);
  }, []);

  async function handleHamsterVoteSubmit(e) {
    e.preventDefault();
    console.log(votedOn);

    let fetchOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(votedOn),
    };

    let result = await fetch("http://127.0.0.1:5000/api/hamster", fetchOptions);
    console.log("Result PUT: ", result);
  }

  function handleHamsterRadioBtnChange(event) {
    const target = event.target;
    const value = target.value;
    // target.type === "radio" ? target.checked :
    const name = target.name;

    setVotedOn({ [name]: value });
  }
  return (
    <div className="App">
      <form className="hamster-vote-form" onSubmit={handleHamsterVoteSubmit}>
        <div className="hamsters">
          {hamsters.map((hamster) => {
            return (
              <HamsterRadioBtn
                key={hamster._id}
                name={hamster.name}
                img={hamster.img}
                id={hamster._id}
                onChange={handleHamsterRadioBtnChange}
              />
            );
          })}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Vote;
