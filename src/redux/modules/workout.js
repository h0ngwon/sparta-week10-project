import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

//inital state

const initialState = {
	comments: [],
	isLoading: false,
	error: null,
};

export const toastError = (error) => {
	const { response } = error;
	const { data } = response;
	const { message } = data;
	toast.error(message);
};

export const __getComments = createAsyncThunk(
	'workout/getComments',
	async (_, thunkAPI) => {
		try {
			const res = await axios.get(
				'http://localhost:4000/comments?_sort=createdAt&_order=desc'
			);
			return thunkAPI.fulfillWithValue(res.data);
		} catch (error) {
			toastError(error);
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const __addComment = createAsyncThunk(
	'workout/addComment',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.post(
				'http://localhost:4000/comments',
				payload
			);
			return thunkAPI.fulfillWithValue(res.data);
		} catch (error) {
			toastError(error);
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const __deleteComment = createAsyncThunk(
	'workout/deleteComment',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.delete(
				`http://localhost:4000/comments/${payload}`
			);
			return thunkAPI.fulfillWithValue(res.data);
		} catch (error) {
			toastError(error);
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const __modifyComment = createAsyncThunk(
	'workout/modifyComment',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.patch(
				`http://localhost:4000/comments/${payload.id}`,
				payload
			);
			return thunkAPI.fulfillWithValue(res.data);
		} catch (error) {
			toastError(error);
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const __modifyCommentsUserInfo = createAsyncThunk(
	'workout/modifyCommentsUserInfo',
	async (_, thunkAPI) => {
		try {
			const res = await axios.get('http://localhost:4000/comments');
			return thunkAPI.fulfillWithValue(res.data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(__getComments.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__getComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
			})
			.addCase(__getComments.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(__addComment.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__addComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments.push(action.payload);
			})
			.addCase(__addComment.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(__deleteComment.pending, (state, _) => {
				state.isLoading = false;
			})
			.addCase(__deleteComment.fulfilled, (state, action) => {
				state.comments = state.comments.filter(
					(item) => item.id !== action.payload
				);
			})
			.addCase(__deleteComment.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(__modifyComment.pending, (state, _) => {
				state.isLoading = false;
			})
			.addCase(__modifyComment.fulfilled, (state, action) => {
				const idx = state.comments.findIndex(
					(item) => item.id === action.payload.id
				);
				state.comments = state.comments.splice(idx, 1, action.payload);
			})
			.addCase(__modifyComment.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(__modifyCommentsUserInfo.pending, (state, _) => {
				state.isLoading = false;
			})
			.addCase(__modifyCommentsUserInfo.fulfilled, (state, action) => {
				
			})
			.addCase(__modifyCommentsUserInfo.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export default workoutSlice.reducer;
export const workoutActions = workoutSlice.actions;
