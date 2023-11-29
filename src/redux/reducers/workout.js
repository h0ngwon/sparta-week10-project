import dummy from "../../fakedata.json";

//action values
export const ADD = "workout/ADD";
export const DELETE = "workout/DELETE";
export const MODIFY = "workout/MODIFY";

//action creators
export const addItem = (payload) => {
	return {
		type: ADD,
		payload,
	};
};

export const deleteItem = (id) => {
    return {
        type: DELETE,
        payload: id,
    }
}

export const modifyItem = (payload) => {
    return {
        type: MODIFY,
        payload,
    }
}

//inital state
const initialState = dummy;

const workoutReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD:
			return [...state, action.payload];
        case DELETE:
            return state = state.filter(s => s.id !== action.payload);
        case MODIFY:
            {
                const filteredData = state.filter(s => s.id !== action.payload.id)
                return [...filteredData, action.payload]
            }
		default:
			return state;
	}
};

export default workoutReducer;
