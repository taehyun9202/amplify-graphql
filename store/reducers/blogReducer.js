import {
  CLEAR_BLOGGER,
  CLEAR_NOTIFICATION,
  CURRENT_POST,
  GET_BLOGGER,
  GET_POSTS,
  LOADING_POSTS,
  PUT_BLOGGER,
  PUT_NOTIFICATION,
} from "../types";

const initialState = {
  posts: [],
  profile: {},
  current: {},
  notification: {
    type: "",
    message: "",
  },
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
    case CURRENT_POST:
      return {
        ...state,
        current: action.payload.current,
      };
    case CLEAR_BLOGGER:
      return {
        ...state,
        profile: action.payload.profile,
        current: action.payload.current,
        loading: false,
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
