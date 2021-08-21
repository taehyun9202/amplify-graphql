import { combineReducers } from "redux";
import { profileReducer } from "./profileReducer";
import { linkReducer } from "./linkReducer";

export default combineReducers({
  profile: profileReducer,
  link: linkReducer,
});
