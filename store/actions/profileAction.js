import { CLEAR_SEARCH, GET_USER, LOG_OUT } from "../types";

export const getProfile = (user, token) => async (dispatch) => {
  const profile = user;

  console.log(profile);
  dispatch({
    type: GET_USER,
    payload: { profile, token },
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

export const clearSearch = () => async (dispatch) => {
  const search = { type: "", input: "" };
  dispatch({
    type: CLEAR_SEARCH,
    payload: { search },
  });
};
