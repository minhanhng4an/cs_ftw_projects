import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import blogAction from "../redux/actions/blog.actions";
import { ClipLoader } from "react-spinners";
import routeActions from "../redux/actions/route.actions";
import { useHistory } from "react-router-dom";

const AddEditBlogPage = () => {
  const loading = useSelector((state) => state.blog.loading);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const blogs = useSelector((state) => state.blog.blogs);
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const images = formData.images;
    dispatch(blogAction.addBlog({ ...formData, images: [images] }));
    dispatch(routeActions.redirect("/"));
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(routeActions.redirect("/"));
  //   }
  // }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo, loading]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="red" size={150} loading={true} />
        </div>
      ) : (
        <Container>
          <h1>Add Blog</h1>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Enter Title"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                name="content"
                placeholder="Enter Content"
                as="textarea"
                rows={5}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                label="Choose Avatar"
                name="images"
                value={formData.images}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default AddEditBlogPage;
