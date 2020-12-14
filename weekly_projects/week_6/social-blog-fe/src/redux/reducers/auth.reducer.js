import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.GET_USER_REQUEST:
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };

    case types.LOGIN_SUCCESS:
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        isAuthenticated: true,
        loading: false,
      };

    case types.LOGIN_FAILURE:
    case types.GET_USER_FAILURE:
      return { ...state, isAuthenticated: false, loading: false };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
      };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default authReducer;
