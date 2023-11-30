import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: null,
	id: '',
	nickname: '',
	avatar: null,
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserInfo: (state, action) => {
			return {
				accessToken: action.payload.accessToken,
				id: action.payload.id,
                nickname: action.payload.nickname,
                avatar: action.payload.avatar,
			};
		},
	},
});

export default user.reducer;
export const userActions = user.actions;
