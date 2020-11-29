import React, { useState, useEffect } from "react";
import ChoiceCard from "./ChoiceCard.js";
import Score from "./Score.js";

const ChoiceCardGroup = () => {
  // Whether game is running
  const [running, setRunning] = useState(false);
  const [buttonActive, setButtonActive] = useState(true);

  // Choice
  const [playerShape, setPlayerShape] = useState("rock");
  const [computerShape, setComputerShape] = useState("paper");

  // Score
  const [scorePlayer, setScorePlayer] = useState(0);
  const [scoreComputer, setScoreComputer] = useState(0);

  // Result Text
  const [textPlayer, setTextPlayer] = useState("");
  const [textComputer, setTextComputer] = useState("");

  const roundOutcome = {
    rock: { rock: 0, paper: -1, scissors: 1 },
    paper: { rock: 1, paper: 0, scissors: -1 },
    scissors: { rock: -1, paper: 1, scissors: 0 },
  };

  const findWinner = () => {
    console.log(playerShape, computerShape);
    const outcome = roundOutcome[playerShape][computerShape];

    if (outcome === 1) {
      setScorePlayer(scorePlayer + 1);
      setTextPlayer("Win!");
    } else if (outcome === 0) {
      setTextComputer("Draw!");
      setTextPlayer("Draw!");
    } else {
      setScoreComputer(scoreComputer + 1);
      setTextComputer("Win!");
    }
  };

  const clickPlayer = () => {
    setTextPlayer("");
    setTextComputer("");
    playerShape === "rock"
      ? setPlayerShape("paper")
      : playerShape === "paper"
      ? setPlayerShape("scissors")
      : setPlayerShape("rock");
  };

  const updateComputerShape = () => {
    if (running) {
      const timeout = 2000 + Math.round(Math.random() * 2) * 100;
      let shape = computerShape;
      let timeID = setInterval(() => {
        setComputerShape(shape);
        shape === "rock"
          ? (shape = "paper")
          : shape === "paper"
          ? (shape = "scissors")
          : (shape = "rock");
      }, 100);
      setRunning(false);
      setButtonActive(false);
      setTimeout(() => {
        clearInterval(timeID);
        setButtonActive(true);
        findWinner();
      }, timeout);
    }
  };

  const clickComputer = () => {
    setTextPlayer("");
    setTextComputer("");
    setRunning(true);
  };

  useEffect(updateComputerShape);

  return (
    <div className="row">
      <ChoiceCard
        title="You"
        color="red"
        callback={clickPlayer}
        shape={playerShape}
        active={buttonActive}
        result={textPlayer}
      />
      <Score scorePlayer={scorePlayer} scoreComputer={scoreComputer} />
      <ChoiceCard
        title="Computer"
        color="green"
        callback={clickComputer}
        shape={computerShape}
        active={buttonActive}
        result={textComputer}
      />
    </div>
  );
};

export default ChoiceCardGroup;
