import {
  CLEAR_BLOGGER,
  CURRENT_POST,
  GET_BLOGGER,
  GET_POSTS,
  LOADING_POSTS,
  PUT_BLOGGER,
} from "../types";

const initialState = {
  posts: [],
  profile: {},
  current: {},
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
    default:
      return state;
  }
};
