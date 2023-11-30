import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//inital state

const initialState = {
	comments: [],
	isLoading: false,
	error: null,
};

export const __getComments = createAsyncThunk(
	'workout/getComments',
	async (payload, thunkAPI) => {
		try {
			const res = await axios('http://localhost:4000/comments');
			return thunkAPI.fulfillWithValue(res.data);
            
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const workoutSlice = createSlice({
	name: 'workout',
	initialState,
	reducers: {
		add: (state, action) => {
			return [action.payload, ...state];
		},
		delete: (state, action) => {
			return state.filter((s) => s.id !== action.payload);
		},
		modify: (state, action) => {
			const filteredData = state.filter(
				(s) => s.id !== action.payload.id
			);

			return [...filteredData, action.payload];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(__getComments.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(__getComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
			})
			.addCase(__getComments.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default workoutSlice.reducer;
export const workoutActions = workoutSlice.actions;
