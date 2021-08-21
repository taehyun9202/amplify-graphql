import { GET_USER, LOG_OUT, PUT_LINK } from "../types";

const initialState = {
  profile: {},
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
