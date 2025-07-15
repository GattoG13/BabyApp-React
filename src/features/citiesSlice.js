import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: []
}

export const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        saveCity: (state, action) =>{
            state.cities = action.payload
        },
    }
});

export const {saveCity} = citiesSlice.actions

export default citiesSlice.reducer