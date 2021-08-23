import { GET_CATEGORIES, GET_POSTS, LOADING_POSTS } from "../types";

const initialState = {
  posts: [],
  categories: [],
  loading: false,
};
export const blogReducer = (state = initialState, action) => {
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

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    default:
      return state;
  }
};
