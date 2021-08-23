import CategoryInput from "../../components/Input/CategoryInput";
import {
  CLEAR_CATEGORIES,
  GET_CATEGORIES,
  GET_POSTS,
  LOADING_POSTS,
  PUT_CATEGORIES,
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

export const getCategories = (category, id) => async (dispatch) => {
  console.log(category, id);
  dispatch({
    type: GET_CATEGORIES,
    payload: { category: category, categoryId: id },
  });
};

export const clearCategories = () => async (dispatch) => {
  console.log("clearing category");
  dispatch({
    type: CLEAR_CATEGORIES,
    payload: { category: [], categoryId: [] },
  });
};

// export const putCategories = (category) => async (dispatch) => {
//   console.log(category);
//   dispatch({
//     type: PUT_CATEGORIES,
//     payload: { category },
//   });
// };
