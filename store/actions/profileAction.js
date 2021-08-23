import { GET_USER, LOG_OUT, PUT_LINK } from "../types";

export const getProfile = (user, token) => async (dispatch) => {
  const profile = user;
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
