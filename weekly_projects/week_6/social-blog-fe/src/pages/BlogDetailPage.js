import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { Container, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import blogAction from "../redux/actions/blog.actions";
import { toast } from "react-toastify";
import routeActions from "../redux/actions/route.actions";

const BlogDetailPage = () => {
  const params = useParams();

  const blog = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loading);
  const userId = useSelector((state) => state.auth.user._id);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();

  const dispatch = useDispatch();

  const deleteBlog = () => {
    dispatch(blogAction.deleteBlog(blog._id));
    dispatch(routeActions.redirect("/"));
  };

  useEffect(() => {
    dispatch(blogActions.singleBlog(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
      toast.success("Blog Deleted!");
    }
  }, [dispatch, history, redirectTo, loading]);

  return (
    <Container>
      {loading || !blog ? (
        <div className="text-center">
          <ClipLoader color="red" size={150} loading={true} />
        </div>
      ) : (
        <>
          {userId === blog.author._id && (
            <Button variant="danger" onClick={deleteBlog}>
              Delete Blog
            </Button>
          )}

          <img src={blog.images[0]} alt="" />
          <h1>{blog.title}</h1>
          <h2>{`Author: ${blog.author.name}`}</h2>
          <p>{blog.content}</p>
        </>
      )}
    </Container>
  );
};

export default BlogDetailPage;
