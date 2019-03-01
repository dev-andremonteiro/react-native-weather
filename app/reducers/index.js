import { combineReducers } from "redux";
import cities from "./weather";

const reducers = combineReducers({
  crazy: (state = {}, action) => state
});

export default reducers;
