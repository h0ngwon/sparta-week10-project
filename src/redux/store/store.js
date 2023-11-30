import { configureStore } from '@reduxjs/toolkit';
import menu from 'redux/modules/menu';
import workout from 'redux/modules/workout';
import auth from 'redux/modules/auth'
import user from 'redux/modules/user';

const store = configureStore({
	reducer: {
		menu,
		workout,
        auth,
        user
	},
});

export default store;
