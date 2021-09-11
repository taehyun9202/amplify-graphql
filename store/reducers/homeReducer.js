import { PUT_LINK, PUT_SEARCH, GET_USERS, GET_ALLPOSTS } from "../types";
const initialState = {
  posts: [],
  users: [],
  search: {
    type: "",
    input: "",
  },
  link: "",
  loading: false,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case GET_ALLPOSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case PUT_SEARCH:
      return {
        ...state,
        search: action.payload.search,
      };
    case PUT_LINK:
      return {
        ...state,
        link: action.payload,
      };
    default:
      return state;
  }
};
