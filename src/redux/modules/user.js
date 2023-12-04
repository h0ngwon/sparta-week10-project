import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'api/apis';
import axios from 'axios';

const initialState = {
	accessToken: null,
	id: '',
	nickname: '',
	avatar: null,
	isLoading: false,
	error: null,
};

const repository = localStorage;
const BASE_URL = 'https://moneyfulpublicpolicy.co.kr';

export const __getUserInfo = createAsyncThunk(
	'user/getUserInfo',
	async (_, thunkAPI) => {
		try {
			const res = await axios.get(`${BASE_URL}/user`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem(
						'accessToken'
					)}`,
				},
			});
			return thunkAPI.fulfillWithValue(res.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);



const user = createSlice({
	name: 'user',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(__getUserInfo.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__getUserInfo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.avatar = action.payload.avatar;
				state.nickname = action.payload.nickname;
				state.id = action.payload.id;
			})
			.addCase(__getUserInfo.rejected, (state, action) => {
				state.error = action.payload;
			})
	},
});

export default user.reducer;
export const userActions = user.actions;
