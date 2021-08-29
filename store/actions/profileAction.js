import {
  CLEAR_SEARCH,
  GET_USER,
  LOG_OUT,
  PUT_LINK,
  PUT_SEARCH,
} from "../types";

export const getProfile = (user, token) => async (dispatch) => {
  const profile = user;

  console.log(profile);
  dispatch({
    type: GET_USER,
    payload: { profile, token },
  });
};

export const putLink = (page) => async (dispatch) => {
  dispatch({
    type: PUT_LINK,
    payload: page,
  });
};

export const logOut = () => async (dispatch) => {
  const profile = {};
  const token = {};
  dispatch({
    type: LOG_OUT,
    payload: { profile, token },
  });
};

export const putSearch = (type, input) => async (dispatch) => {
  const search = { type: type, input: input };
  dispatch({
    type: PUT_SEARCH,
    payload: { search },
  });
};

export const clearSearch = () => async (dispatch) => {
  const search = { type: "", input: "" };
  dispatch({
    type: CLEAR_SEARCH,
    payload: { search },
  });
};
