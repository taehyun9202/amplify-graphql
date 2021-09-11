import { combineReducers } from "redux";
import { profileReducer } from "./profileReducer";
import { blogReducer } from "./blogReducer";
import { homeReducer } from "./homeReducer";

export default combineReducers({
  profile: profileReducer,
  blog: blogReducer,
  home: homeReducer,
});
