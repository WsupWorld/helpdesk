// Import the action types

export const SET_SESSION_ID = "SET_SESSION_ID";
export const CLEAR_SESSION_ID = "CLEAR_SESSION_ID";

// Define the action creators
export const setSessionId = (sessionId) => {
    return {
        type: SET_SESSION_ID,
        payload: sessionId,
    };
};

export const clearSessionId = () => {
    return {
        type: CLEAR_SESSION_ID,
    };
};