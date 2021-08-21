import { GET_USER, LOG_OUT, PUT_LINK } from "../types";

export const getProfile = (user) => async (dispatch) => {
  console.log(user);
  const profile = { ...user.attributes, username: user.username };
  const token = user.signInUserSession.accessToken.jwtToken;
  dispatch({
    type: GET_USER,
    payload: { profile, token },
  });
};

export const putLink = (page) => async (dispatch) => {
  console.log(page);
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
