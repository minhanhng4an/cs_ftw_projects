import React, { useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";
import { ClipLoader } from "react-spinners";

const LoginPage = () => {
  const loading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(routeActions.redirect("/"));
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="red" size={150} loading={true} />
        </div>
      ) : (
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  placeholder="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Col>
        </Row>
      )}
    </>
  );
};

export default LoginPage;
