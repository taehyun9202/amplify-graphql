import { GET_CATEGORIES, GET_POSTS, LOADING_POSTS } from "../types";

export const getPosts = (posts) => async (dispatch) => {
  dispatch({
    type: GET_POSTS,
    payload: { posts },
  });
};

export const loadingPosts = () => async (dispatch) => {
  dispatch({
    type: LOADING_POSTS,
  });
};

export const getCategories = (categories) => async (dispatch) => {
  console.log(categories);
  dispatch({
    type: GET_CATEGORIES,
    payload: { categories },
  });
};
