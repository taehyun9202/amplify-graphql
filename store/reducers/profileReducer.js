import { GET_USER, LOG_OUT } from "../types";

const initialState = {
  profile: {},
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
