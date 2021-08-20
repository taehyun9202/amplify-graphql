import { combineReducers } from "redux";
import { profileReducer } from "./profileReducer";
import { listReducer } from "./listReducer";

export default combineReducers({
  profile: profileReducer,
  list: listReducer,
});
