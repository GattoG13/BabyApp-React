import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    selectedCategory: null
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        saveCategories: (state, action) =>{
            state.categories = action.payload
        },
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    }
});

export const {saveCategories, selectCategory} = categoriesSlice.actions

export default categoriesSlice.reducer