import CategoryInput from "../../components/Input/CategoryInput";
import {
  CLEAR_BLOGGER,
  GET_BLOGGER,
  GET_POSTS,
  LOADING_POSTS,
  PUT_BLOGGER,
} from "../types";

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

export const getBlogger = (profile) => async (dispatch) => {
  dispatch({
    type: GET_BLOGGER,
    payload: { profile: profile },
  });
};

export const clearBlogger = () => async (dispatch) => {
  dispatch({
    type: CLEAR_BLOGGER,
    payload: { profile: {} },
  });
};

// export const putBlogger = (category) => async (dispatch) => {
//   console.log(category);
//   dispatch({
//     type: PUT_BLOGGER,
//     payload: { category },
//   });
// };
