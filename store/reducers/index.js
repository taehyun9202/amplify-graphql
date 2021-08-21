import { combineReducers } from "redux";
import { profileReducer } from "./profileReducer";
import { postReducer } from "./postReducer";

export default combineReducers({
  profile: profileReducer,
  post: postReducer,
});
