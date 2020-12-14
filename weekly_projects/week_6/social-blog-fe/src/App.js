import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLayout from "./routes/AdminLayout";
import PublicLayout from "./routes/PublicLayout";
import PrivateRoute from "./routes/PrivateRoute";
import AlertMsg from "./components/AlertMsg";
import { useDispatch } from "react-redux";
import authActions from "./redux/actions/auth.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.getUser());
  });

  return (
    <Router>
      <AlertMsg />
      <Switch>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
    </Router>
  );
}

export default App;
