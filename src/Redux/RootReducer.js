import { combineReducers } from "redux";
import {
  getUserReducer,
  getFilterUserReducer,
} from "./Reducers/GetUsersReduce";

const rootReducer = combineReducers({
  getUsers: getUserReducer,
  getFilterUser: getFilterUserReducer,
});

export default rootReducer;
