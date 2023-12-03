import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toastError } from './workout';

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
	async (state, thunkAPI) => {
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

export const __modifyProfile = createAsyncThunk(
	'user/modifyProfile',
	async (payload, thunkAPI) => {
		const formData = new FormData();
		formData.append('avatar', payload.file);
		formData.append('nickname', payload.modifyNickname);

		try {
			const res = await axios.patch(`${BASE_URL}/profile`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${repository.getItem(
						'accessToken'
					)}`,
				},
			});
			console.log(res.data);
			return thunkAPI.fulfillWithValue(res.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserInfo: (_, action) => {
			return {
				accessToken: action.payload.accessToken,
				id: action.payload.id,
				nickname: action.payload.nickname,
				avatar: action.payload.avatar,
			};
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(__modifyProfile.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__modifyProfile.fulfilled, (state, action) => {
				const repository = localStorage;
				state.accessToken = repository.getItem('accessToken');
				state.nickname = action.payload.nickname;
				state.avatar = action.payload.avatar;
				console.log();
			})
			.addCase(__modifyProfile.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export default user.reducer;
export const userActions = user.actions;
