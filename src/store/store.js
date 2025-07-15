import { configureStore } from "@reduxjs/toolkit";
import departmentsReducer from "../features/departmentsSlice"
import citiesReducer from "../features/citiesSlice"
import usersReducer from "../features/usersSlice"
import categoriesReducer from "../features/categoriesSlice"
import statesReducer from "../features/statesSlice";


export const store = configureStore({
    reducer: {
        departments : departmentsReducer,
        cities : citiesReducer,
        users : usersReducer,
        categories : categoriesReducer,
        states : statesReducer
    }
})