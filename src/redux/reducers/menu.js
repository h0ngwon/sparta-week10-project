//inital state
const initialState = "스쿼트";

//action values
export const SELECT = "menu/SELECT";

//action creators
export const select = (workout) => {
	return {
		type: SELECT,
		payload: workout,
	};
};

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECT:
			return (state = action.payload);

		default:
			return state;
	}
};

export default menuReducer