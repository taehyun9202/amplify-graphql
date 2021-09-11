import { PUT_LINK, PUT_SEARCH, GET_USERS, GET_ALLPOSTS } from "../types";

export const getUsers = (users) => async (dispatch) => {
  dispatch({
    type: GET_USERS,
    payload: { users },
  });
};

export const getAllPosts = (posts) => async (dispatch) => {
  dispatch({
    type: GET_ALLPOSTS,
    payload: { posts },
  });
};

export const putLink = (id) => async (dispatch) => {
  console.log(id);
  dispatch({
    type: PUT_LINK,
    payload: { id },
  });
};

export const putSearch = (type, input) => async (dispatch) => {
  const search = { type: type, input: input };
  dispatch({
    type: PUT_SEARCH,
    payload: { search },
  });
};
