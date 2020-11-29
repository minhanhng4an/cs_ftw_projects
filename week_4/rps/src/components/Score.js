import React from "react";

const Score = ({ scorePlayer, scoreComputer }) => {
  return (
    <div className="col">
      <h1>
        <span style={{ color: "red" }}>{scorePlayer}</span> -
        <span style={{ color: "green" }}>{scoreComputer}</span>
      </h1>
    </div>
  );
};

export default Score;
