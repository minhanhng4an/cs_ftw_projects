import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Greeting from "./components/Greeting";
import Age from "./components/Age";
import Counter from "./components/Counter";

function App() {
  return (
    <Container>
      {/* <Greeting name="Minh Anh" />
      <Age yearOfBirth="1996" /> */}
      <Counter />
    </Container>
  );
}

export default App;
