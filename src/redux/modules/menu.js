import { createSlice } from '@reduxjs/toolkit';

//inital state
const initialState = '스쿼트';

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		select: (state, action) => {
			return (state = action.payload);
		},
	},
});



export default menuSlice.reducer;
export const menuActions = menuSlice.actions;
