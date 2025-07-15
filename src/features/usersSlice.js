import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [ ]
}

export const usersSlice = createSlice({
    name: "tareas",
    initialState,
    reducers: {
        saveUser: (state, action) =>{
            state.tareas = action.payload
        }, 
        registerUser: (action)=>{

        }
    }
});

export const {saveUser, registerUser} = usersSlice.actions

export default usersSlice.reducer