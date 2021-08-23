import {
  GET_CATEGORIES,
  GET_POSTS,
  LOADING_POSTS,
  PUT_CATEGORIES,
} from "../types";

const initialState = {
  posts: [],
  categoryId: "",
  category: [],
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
        category: action.payload.category,
        categoryId: action.payload.categoryId,
        loading: false,
      };
    case PUT_CATEGORIES:
      return {
        ...state,
        category: action.payload.category,
        loading: false,
      };
    default:
      return state;
  }
};
