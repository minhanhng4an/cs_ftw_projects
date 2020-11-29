// import logo from "./logo.svg";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChoiceCardGroup from "./components/ChoiceCardGroup.js";

function App() {
  return (
    <div className="container">
      <h1>Welcome to React Class</h1>
      <ChoiceCardGroup />
    </div>
  );
}

export default App;
