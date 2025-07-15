import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    states: [],
}

export const statesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        saveStates: (state, action) =>{
            state.states = action.payload
        },
        deletesEvent: (state, action) => {
            const eventId = action.payload;
            state.states = state.states.filter(event => event.id !== eventId);
        }
    }
});

export const {saveStates, deletesEvent} = statesSlice.actions

export default statesSlice.reducer