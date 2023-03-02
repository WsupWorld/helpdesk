// Import the action types
import { SET_SESSION_ID, CLEAR_SESSION_ID } from "../actions/SessionActions";

// Define the initial state
const initialState = {
    sessionId: null,
};

// Define the reducer function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_ID:
            return {
                ...state,
                sessionId: action.payload,
            };
        case CLEAR_SESSION_ID:
            return {
                ...state,
                sessionId: null,
            };
        default:
            return state;
    }
};

export default userReducer;