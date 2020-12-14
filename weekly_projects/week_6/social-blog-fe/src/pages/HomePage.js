import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import PaginationBar from "../components/PaginationBar";

import { ClipLoader } from "react-spinners";
import { Container, CardDeck, Card, Button, Jumbotron } from "react-bootstrap";
import routeActions from "../redux/actions/route.actions";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const loading = useSelector((state) => state.blog.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [pageNum, setPageNum] = useState(1);

  const getLastUpdate = (dateString) =>
    Math.round((Date.now() - Date.parse(dateString)) / 1000000);

  const dispatch = useDispatch();
  dispatch(routeActions.removeRedirectTo());
  useEffect(() => {
    dispatch(blogActions.blogRequest(pageNum));
  }, [dispatch, pageNum]);

  return (
    <Container>
      <Jumbotron>
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
        <p>
          {isAuthenticated && (
            <Button variant="primary" as={NavLink} exact={true} to="/blog/add">
              Write Now
            </Button>
          )}
        </p>
      </Jumbotron>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      />
      {loading ? (
        <div className="text-center">
          <ClipLoader color="red" size={150} loading={true} />
        </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <CardDeck>
              {blogs.map((blog) => (
                // <li key={blog._id}>{blog.title}</li>
                <Card
                  key={blog._id}
                  className="blog"
                  // href={`blogs/${blog._id}`}
                >
                  <Card.Img variant="top" src={blog.images[0]} />
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.content}</Card.Text>
                    <Button variant="primary" href={`blogs/${blog._id}`}>
                      Go somewhere
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      {`@${blog.author.name} updated ${getLastUpdate(
                        blog.updatedAt
                      )} minutes ago.`}
                    </small>
                  </Card.Footer>
                </Card>
              ))}
            </CardDeck>
          ) : (
            <p>There is no blogs</p>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
