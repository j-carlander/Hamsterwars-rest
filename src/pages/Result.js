import React, { useEffect, useState } from "react";
import { fetchHamsters } from "../components/fetchHamsters/fetchHamsters";
import { HamsterResult } from "../components/HamsterResult/HamsterResult";
import "./Result.css";

function Result() {
  const [hamsters, setHamsters] = useState([]);

  useEffect(() => {
    fetchHamsters(setHamsters);
  }, []);

  return (
    <div>
      <h1>Result</h1>
      <div className="hamsters">
        {hamsters.map((hamster) => {
          return (
            <HamsterResult
              key={hamster._id}
              votes={hamster.votes}
              img={hamster.img}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Result;
