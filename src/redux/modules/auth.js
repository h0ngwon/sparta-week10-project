import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogin: !!localStorage.getItem('accessToken'),
};

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
            const accessToken = action.payload;
            localStorage.setItem('accessToken', accessToken)
			state.isLogin = true;
		},
		logout: (state, action) => {
			state.isLogin = false;
            localStorage.clear();
		},
	},
});

export default auth.reducer;
export const authActions = auth.actions;
