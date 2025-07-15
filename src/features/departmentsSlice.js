import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: []
}

export const departmentsSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {
        saveDepts: (state, action) =>{
            state.departments = action.payload
        },
        saveDept: (state, action) =>{
            console.log(action);
            
            state.departments = action.payload
        }
    }
});

export const { saveDepts, saveDept } = departmentsSlice.actions;

export default departmentsSlice.reducer;