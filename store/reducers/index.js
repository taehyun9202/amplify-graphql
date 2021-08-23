import { combineReducers } from "redux";
import { profileReducer } from "./profileReducer";
import { blogReducer } from "./blogReducer";

export default combineReducers({
  profile: profileReducer,
  blog: blogReducer,
});
