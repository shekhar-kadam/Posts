import axios from "axios";
import BASE_URL from "../Url";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../Constants/GetUsers";
import {
  GET_FILTER_USERS_REQUEST,
  GET_FILTER_USERS_SUCCESS,
  GET_FILTER_USERS_FAILURE,
} from "../Constants/GetFilteredUser";

export const getAllUsers = (start, limit, userId) => async (dispatch) => {
  dispatch({
    type: GET_USERS_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `${BASE_URL}posts?_page=${start}&_limit=${limit}`
    );

    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (err) {
    if (err?.response) {
      dispatch({
        type: GET_USERS_FAILURE,
        payload: err?.response?.data?.message,
      });
    }

    dispatch({ type: GET_USERS_FAILURE, payload: err.message });
  }
};
export const getFilteredUsers = (limit, userId) => async (dispatch) => {
  dispatch({
    type: GET_FILTER_USERS_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `${BASE_URL}posts?_limit=${limit}&userId=${userId}`
    );

    dispatch({ type: GET_FILTER_USERS_SUCCESS, payload: data });
  } catch (err) {
    if (err?.response) {
      dispatch({
        type: GET_FILTER_USERS_FAILURE,
        payload: err?.response?.data?.message,
      });
    }

    dispatch({ type: GET_FILTER_USERS_FAILURE, payload: err.message });
  }
};
