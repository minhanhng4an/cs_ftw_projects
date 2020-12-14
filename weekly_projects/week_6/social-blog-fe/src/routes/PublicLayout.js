import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import NotFoundPage from "../pages/NotFoundPage";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import AddEditBlogPage from "../pages/AddEditBlogPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
