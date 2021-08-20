import { GET_USER, LOG_OUT } from "../types";

export const getProfile = (user) => async (dispatch) => {
  console.log(user);
  const profile = { ...user.attributes, username: user.username };
  const token = user.signInUserSession.accessToken.jwtToken;
  dispatch({
    type: GET_USER,
    payload: { profile, token },
  });
};

export const logOut = () => async (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
