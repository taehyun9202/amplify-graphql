import { GET_USER, LOG_OUT, PUT_LINK, PUT_SEARCH } from "../types";

const initialState = {
  profile: {},
  search: {
    type: "",
    input: "",
  },
  link: "",
  token: "",
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        profile: action.payload.profile,
        token: action.payload.token,
      };
    case PUT_LINK:
      return {
        ...state,
        link: action.payload,
      };
    case PUT_SEARCH:
      return {
        ...state,
        search: action.payload.search,
      };
    case LOG_OUT:
      return {
        ...state,
        profile: action.payload.profile,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
