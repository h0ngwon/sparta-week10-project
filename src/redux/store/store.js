import { configureStore } from '@reduxjs/toolkit';
import menu from 'redux/modules/menu';
import workout from 'redux/modules/workout';

const store = configureStore({
	reducer: {
		menu,
		workout: workout
	},
});

export default store;
