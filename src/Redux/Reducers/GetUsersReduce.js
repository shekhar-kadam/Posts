import {
  GET_FILTER_USERS_REQUEST,
  GET_FILTER_USERS_SUCCESS,
  GET_FILTER_USERS_FAILURE,
} from "../Constants/GetFilteredUser";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../Constants/GetUsers";

const defaultState = {
  loading: false,
  data: null,
  error: null,
};

export const getUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_USERS_FAILURE:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};
export const getFilterUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_FILTER_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_FILTER_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_FILTER_USERS_FAILURE:
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};
