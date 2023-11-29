import { createStore } from "redux";
import { combineReducers } from "redux";
import workoutReducer from "redux/reducers/workout";
import menuReducer from "redux/reducers/menu";

const rootReducer = combineReducers({ workoutReducer, menuReducer });
const store = createStore(rootReducer);

export default store;
