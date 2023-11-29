import { combineReducers, createStore } from 'redux';
import menuReducer from 'redux/modules/menu';
import workoutReducer from 'redux/modules/workout';

const rootReducer = combineReducers({ workoutReducer, menuReducer });
const store = createStore(rootReducer);

export default store;
