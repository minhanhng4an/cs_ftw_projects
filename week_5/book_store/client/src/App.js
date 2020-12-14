import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicNavbar from "./components/PublicNavbar";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import ReadingPage from "./pages/ReadingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SaveAlert from "./components/SaveAlert";

// const BACKEND_API = process.env.REACT_APP_BACKEND_API;

function App() {
  return (
    <>
      <SaveAlert />
      <Router>
        <PublicNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/books/:id" component={BookDetailPage} />
          <Route exact path="/reading" component={ReadingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
