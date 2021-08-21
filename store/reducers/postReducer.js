import { GET_POSTS, LOADING_POSTS } from "../types";

const initialState = {
  posts: [],
  loading: false,
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
      };
    default:
      return state;
  }
};
