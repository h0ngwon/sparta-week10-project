import { createSlice } from '@reduxjs/toolkit';
import dummy from '../../fakedata.json';

//inital state
const initialState = dummy;

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
});

export default workoutSlice.reducer;
export const workoutActions = workoutSlice.actions;
