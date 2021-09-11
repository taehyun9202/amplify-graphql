import {
  CLEAR_BLOGGER,
  CLEAR_NOTIFICATION,
  GET_BLOGGER,
  GET_POSTS,
  LOADING_POSTS,
  PUT_CATEGORY,
  PUT_NOTIFICATION,
} from "../types";

const initialState = {
  posts: [],
  profile: {},
  notification: {
    type: "",
    message: "",
  },
  category: "",
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
    case GET_BLOGGER:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
      };
    case CLEAR_BLOGGER:
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
      };
    case PUT_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case PUT_NOTIFICATION:
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification,
      };
    default:
      return state;
  }
};
