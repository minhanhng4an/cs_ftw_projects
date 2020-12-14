import * as types from "../constants/blog.constants";
const initialState = {
  blogs: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_BLOGS_REQUEST:
    case types.GET_SINGLE_BLOG_REQUEST:
    case types.ADD_BLOG_REQUEST:
    case types.DELETE_BLOG_REQUEST:
      return { ...state, loading: true };

    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: payload,
      };
    case types.GET_BLOGS_FAILURE:
    case types.GET_SINGLE_BLOG_FAILURE:
    case types.ADD_BLOG_SUCCESS:
    case types.ADD_BLOG_FAILURE:
    case types.DELETE_BLOG_SUCCESS:
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default blogReducer;
