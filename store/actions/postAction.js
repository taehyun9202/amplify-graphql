import { GET_POSTS, LOADING_POSTS } from "../types";

export const getPosts = (posts) => async (dispatch) => {
  console.log(posts);
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
