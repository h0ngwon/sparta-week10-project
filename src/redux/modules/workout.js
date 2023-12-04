import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jsonApi } from 'api/apis';
import { toast } from 'react-toastify';

//inital state

const initialState = {
	comments: [],
	isLoading: true,
	isError: false,
	error: null,
};

const getCommentsfromDb = async () => {
	const { data } = await jsonApi.get('/comments?_sort=createdAt&_order=desc');
	return data;
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
			const comments = getCommentsfromDb();
			return comments;
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
			await jsonApi.post('/comments', payload);
			const comments = getCommentsfromDb();
			return comments;
		} catch (error) {
			toastError(error);
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const __deleteComment = createAsyncThunk(
	'workout/deleteComment',
	async (id, thunkAPI) => {
		try {
			await jsonApi.delete(`/comments/${id}`);
			const comment = getCommentsfromDb();
			return comment;
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
			await jsonApi.patch(`/comments/${payload.id}`, payload);
			const comment = getCommentsfromDb();
			return comment;
		} catch (error) {
			toastError(error);
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
				state.isError = false;
				state.error = null;
			})
			.addCase(__getComments.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.payload;
			})
			.addCase(__addComment.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__addComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
				state.isError = false;
				state.error = false;
			})
			.addCase(__addComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.payload;
			})
			.addCase(__deleteComment.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__deleteComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
			})
			.addCase(__deleteComment.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(__modifyComment.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(__modifyComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
			})
			.addCase(__modifyComment.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default workoutSlice.reducer;
export const workoutActions = workoutSlice.actions;
