import * as types from "../constants/blog.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const blogRequest = (pageNum) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(`api/blogs?page=${pageNum}`);
    dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: null });
  }
};

const singleBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOG_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(`api/blogs/${blogId}`);
    dispatch({ type: types.GET_SINGLE_BLOG_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOG_FAILURE, payload: null });
  }
};

const addBlog = (blog) => async (dispatch) => {
  dispatch({ type: types.ADD_BLOG_REQUEST, payload: null });
  try {
    // TODO
    const token = localStorage.getItem("token");
    await api.post(`api/blogs/`, blog, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: types.ADD_BLOG_SUCCESS, payload: null });
    toast.success("Blog Uploaded!");
  } catch (error) {
    dispatch({ type: types.ADD_BLOG_FAILURE, payload: null });
    toast.error("Something went wrong!");
  }
};

const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    // TODO
    const token = localStorage.getItem("token");
    await api.delete(`api/blogs/${blogId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: null });
    toast.success("Blog Uploaded!");
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: null });
    toast.error("Something went wrong!");
  }
};

const blogAction = {
  blogRequest,
  singleBlog,
  addBlog,
  deleteBlog,
};

export default blogAction;
