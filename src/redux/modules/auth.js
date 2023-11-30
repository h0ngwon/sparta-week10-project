import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogin: false,
};

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			return { ...state, isLogin: true };
		},
		logout: (state) => {
			return { ...state, isLogin: false };
		},
	},
});

export default auth.reducer;
export const authActions = auth.actions;
